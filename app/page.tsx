import JobFilters from "@/components/general/JobFilters";
import JobListings from "@/components/general/JobListings";
import Navbar from "@/components/general/Navbar";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <div className="grid grid-cols-3 gap-8">
                <JobFilters />
            
                <JobListings />
            
        </div>
      </section>
    </div>
  );
}
