import JobFilters from "@/components/general/JobFilters";
import Navbar from "@/components/general/Navbar";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <div className="grid grid-cols-3 gap-8">
            <Card className="col-span-1">
                <JobFilters />
            </Card>

            <Card className="col-span-2">
                
            </Card>
        </div>
      </section>
    </div>
  );
}
