/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyState } from "@/components/general/EmptyState";
import { prisma } from "../utils/db";
import requireUser from "../utils/requireUser";
import { JobCard } from "@/components/general/JobCard";
import Navbar from "@/components/general/Navbar";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      jobPost: {
        select: {
          id: true,
          jobTitle: true,
          jobDescription: true,
          salaryFrom: true,
          SalaryTo: true,
          employmentType: true,
          location: true,
          createdAt: true,
          Company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
      },
    },
  });

  return data;
}

export default async function FavouritePage() {
  const session = await requireUser();
  const data = await getFavorites(session?.id as string);

  if (data.length === 0) {
    return (
      <div>
        <Navbar />

        <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
          <div className="flex items-center justify-center">
            <EmptyState
              buttonText="Find Favourites Job"
              description="You do not have any favourites job yet."
              href="/"
              title="No Favourite Jobs found"
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <div className="grid grid-cols-1 mt-5 gap-5">
          {data.map((favourite: any) => (
            <JobCard key={favourite.jobPost.id} job={favourite.jobPost} />
          ))}
        </div>
      </section>
    </div>
  );
}
