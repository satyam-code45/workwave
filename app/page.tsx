import JobFilters from "@/components/general/JobFilters";
import JobListings from "@/components/general/JobListings";
import { JobListingsLoading } from "@/components/general/JobListingsLoading";
import Navbar from "@/components/general/Navbar";
import { Suspense } from "react";

type searchParams = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Home({ searchParams }: searchParams) {
  const params = await searchParams;

  const jobTypes = params.jobTypes?.split(",") || [];
  const currentPage = Number(params.page) || 1;
  const location = params.location || "";
  const filterKey = `page=${currentPage};types=${jobTypes.join(
    ","
  )};location=${location}`;

  return (
    <div>
      <Navbar />

      <section className="w-full px-6 md:px-12 py-33 lg:py-24">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <JobFilters />
          </div>
          <div className="col-span-2">
            <Suspense fallback={<JobListingsLoading />} key={filterKey}>
              <JobListings
                currentPage={currentPage}
                jobTypes={jobTypes}
                location={location}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
