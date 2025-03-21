import { prisma } from "@/app/utils/db";
import { EmptyState } from "./EmptyState";
import { JobCard } from "./JobCard";

async function getData() {
  const data = await prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      jobTitle: true,
      id: true,
      salaryFrom: true,
      SalaryTo: true,
      employmentType: true,
      location: true,
      createdAt: true,
      Company: {
        select: {
          name: true,
          location: true,
          logo: true,
          about: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function JobListings() {
  const data = await getData();

  return (
    <div className="col-span-2">
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          description="Try serching for a different job title or location"
          buttonText="Clear all filters"
          href="/"
        />
      )}
    </div>
  );
}
