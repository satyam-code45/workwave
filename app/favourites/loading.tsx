import { JobListingsLoading } from "@/components/general/JobListingsLoading";
import Navbar from "@/components/general/Navbar";

export default function FavouriteLoading() {
  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <JobListingsLoading/>
      </section>
    </div>
  );
}
