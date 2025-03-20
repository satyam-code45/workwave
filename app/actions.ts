"use server";

import requireUser from "./utils/requireUser";
import { z } from "zod";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodschema";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";

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

export async function createJob(data: z.infer<typeof jobSchema>){
  
  const user = await requireUser();

  const req = await request()

  const decision = await aj.protect(req)

  if (decision.isDenied()) {
    throw new Error("Forbidden")
  }

  const validateData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where:{
      userId: user.id
    },
    select: {
      id: true
    }
  })

  if (!company?.id) {
    return redirect("/")
  }

  const jobPost = await prisma.jobPost.create({
    data:{
      jobDescription:validateData.jobDescription,
      jobTitle: validateData.jobTitle,
      employmentType: validateData.employmentType,
      listingDuration: validateData.listingDuration,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      SalaryTo: validateData.salaryTo,
      benefits: validateData.benefits,
      companyId: company.id
    }
  })

  return redirect("/")

}