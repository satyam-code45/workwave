/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/app/utils/db";
import { inngest } from "../../utils/inngest/client";
import { resend } from "@/lib/resend";


export const handleJobExpiration = inngest.createFunction(
  { id: "job-expiration", cancelOn:[
    {
      event: "job/cancel.expiraton",
      if: "event.data.jobId == async.data.jobId"
    }
  ] },
  { event: "job/created" },
  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    await step.sleep("wait-for-expiration", `${expirationDays}d`);

    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: {
          id: jobId,
        },
        data: {
          status: "EXPIRED",
        },
      });
    });
    return { jobId, message: "Job Marked has expired" };
  }
);

export const sendPeriodicJobListings = inngest.createFunction(
  { id: "send-job-listings" },
  { event: "jobseeker/created" },
  async ({ event, step }) => {
    const { userId} = event.data;

    const totalDays = 30;
    const intervalDays = 2;
    let currentDay = 0;

    while (currentDay < totalDays) {
      await step.sleep("wait-interval", `${intervalDays}d`);
      currentDay += intervalDays;

      const recentJobs = await step.run("fetch-recent-jobs", async () => {
        return await prisma.jobPost.findMany({
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
          include: {
            Company: {
              select: {
                name: true,
              },
            },
          },
        });
      });

      if (recentJobs.length > 0) {
        await step.run("send-email", async () => {
          const jobListingsHtml = recentJobs
            .map(
              (job: any) => `
            <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
              <h3 style="margin: 0;">${job.jobTitle}</h3>
              <p style="margin: 5px 0;">${job.Company.name} • ${
                job.location
              }</p>
              <p style="margin: 5px 0;">$${job.salaryFrom.toLocaleString()} - $${job.SalaryTo.toLocaleString()}</p>
            </div>
          `
            )
            .join("");

          await resend.emails.send({
            from: "Workwave <onboarding@resend.dev>",

            //here i have to hardcode email instead of getting it dynamically because we do not have a verified domain and resend doesn not allow to send if you do not have verified domain

            to: ["satyamwrites23@gmail.com"],
            subject: "Latest Job Opportniues for you",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Latest Job Opportunities</h2>
                ${jobListingsHtml}
                <div style="margin-top: 30px; text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_URL}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View More Jobs</a>
                </div>
              </div>
            `,
          });
        });
      }
    }
    return {userId, message: "Completed 30 day job listing notifications"}
  }
);
