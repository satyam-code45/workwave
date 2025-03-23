import { prisma } from "@/app/utils/db";
import requireUser from "@/app/utils/requireUser";
import { EditJobForm } from "@/components/general/EditJobForm";
import Navbar from "@/components/general/Navbar";
import { notFound } from "next/navigation";

async function getData(jobId: string, userId: string) {
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      Company: {
        userId: userId,
      },
    },
    select: {
      benefits: true,
      id: true,
      jobDescription: true,
      jobTitle: true,
      salaryFrom: true,
      SalaryTo: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      Company: {
        select: {
          about: true,
          name: true,
          location: true,
          website: true,
          xAccount: true,
          logo: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ jobId: string }>;

export default async function EditJobPage({ params }: { params: Params }) {
  const { jobId } = await params;
  const session = await requireUser();
  const data = await getData(jobId, session?.id as string);
  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <EditJobForm jobPost={data}/>
      </section>
    </div>
  );
}
