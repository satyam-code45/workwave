"use server";

import requireUser from "./utils/requireUser";
import { z } from "zod";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodschema";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "./utils/stripe";
import { jobListingDurationPricing } from "./utils/jobListingDurationPricing";
import { inngest } from "./utils/inngest/client";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
  //check first user is logged in
  const session = await requireUser();

  //arcjet implementation
  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  //validate the inputs against company Schema

  const validateData = companySchema.parse(data);

  //push to database

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  //check first user is logged in
  const session = await requireUser();

  //arcjet implementation
  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  //validate the inputs against jobSeeker Schema

  const validateData = jobSeekerSchema.parse(data);

  //push to database

  await prisma.user.update({
    where: {
      id: session.id as string,
    },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  //Stripe setup
  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email as string,
      name: user.name as string,
    });

    stripeCustomerId = customer.id;

    //update user with stripe customer id

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId: stripeCustomerId,
      },
    });
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      jobDescription: validateData.jobDescription,
      jobTitle: validateData.jobTitle,
      employmentType: validateData.employmentType,
      listingDuration: validateData.listingDuration,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      SalaryTo: validateData.salaryTo,
      benefits: validateData.benefits,
      companyId: company.id,
    },
    select:{
      id: true,
    },
  });

  const pricingTier = jobListingDurationPricing.find(
    (tier) => tier.days === validateData.listingDuration
  );

  if (!pricingTier) {
    throw new Error("Invalid Listing Duration Selected");
  }
  //ingest implementation
  await inngest.send({
    name: "job/created",
    data:{
      jobId: jobPost.id,
      expirationDays: validateData.listingDuration,
    }
  })

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job Posting - ${pricingTier.days} Days`,
            description: pricingTier.description,
            images: [
              "https://iwgg2l2l6b.ufs.sh/f/g8rwv5jUkK4cFGdSj257pU9iuAlQP2Wq6YeX3G1LdNDwz8Bo",
            ],
          },
          currency: "USD",
          unit_amount: pricingTier.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      jobId: jobPost.id,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
  });

  return redirect(session.url as string);
}
