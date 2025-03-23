import JobFilters from "@/components/general/JobFilters";
import JobListings from "@/components/general/JobListings";
import { JobListingsLoading } from "@/components/general/JobListingsLoading";
import Navbar from "@/components/general/Navbar";
import { Suspense } from "react";

type searchParams = {
  searchParams: Promise<{
    page? :string,
  }>;
}

export default  async function Home({searchParams}: searchParams) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <JobFilters />
          </div>
          <div className="col-span-2">
          <Suspense  fallback={<JobListingsLoading />} key={currentPage}>
            <JobListings currentPage={currentPage}/>
          </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
