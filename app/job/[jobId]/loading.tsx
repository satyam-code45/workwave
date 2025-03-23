import Navbar from "@/components/general/Navbar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingJobPage() {
  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <div className="container mx-auto py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-8 col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-9 w-[320px] mb-2" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-[100px] " />
                    <Skeleton className="h-5 w-[100px] " />
                    <Skeleton className="h-5 w-[100px] " />
                  </div>
                </div>
              </div>
              <section className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </section>
              <section className="flex flex-wrap gap-4">
                <Skeleton className="h-9 w-[200px] mb-4" />
                <div className="flex flex-wrap gap-3">
                  {[...Array(15)].map((_, index) => (
                    <Skeleton className="h-7 w-[180px]" key={index} />
                  ))}
                </div>
              </section>
            </div>

            <div className="sapce-y-6 ">
              <Card className="p-6 mb-4">
                <div className="sapce-y-4">
                  <div>
                    <Skeleton className="h-6 w-[100px] mb-2" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              </Card>
              <Card className="p-6 mb-4">
                <div className="sapce-y-4">
                  <Skeleton className="h-6 w-[200px] mb-2" />
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-3 w-[150px]" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-3 w-[130px]" />
                    <Skeleton className="h-3 w-[140px]" />
                  </div>
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-3 w-[140px]" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-3 w-[130px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 mb-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="rounded-lg size-12" />
                    <div>
                      <Skeleton className="h-5 w-[150px] mb-2" />
                      <Skeleton className="h-2 w-[300px] mb-2" />
                      <Skeleton className="h-2 w-[280px]" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
