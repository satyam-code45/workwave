import { deleteJobPost } from "@/app/actions";
import requireUser from "@/app/utils/requireUser";
import Navbar from "@/components/general/Navbar";
import { GeneralSubmitButtons } from "@/components/general/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ jobId: string }>;

export default async function deleteJob({ params }: { params: Params }) {
  await requireUser();
  const { jobId } = await params;

  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 mt-24 md:px-12 md:py-18 lg:py-24">
        <Card className="max-w-sm mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Are you absolutely sure?</CardTitle>
            <CardDescription>This action cannot be undone. </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-evenly">
            <Link
              href="/my-jobs"
              className={buttonVariants({ variant: "outline" })}
            >
              <ArrowLeft />
              Cancel
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteJobPost(jobId);
              }}
            >
              <GeneralSubmitButtons
                text="Delete Job"
                variantButton="destructive"
                icon={<Trash2 />}
              />
            </form>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
