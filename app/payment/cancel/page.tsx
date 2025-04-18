import requireUser from "@/app/utils/requireUser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default async function PaymentCancelled() {
  await requireUser();
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px] h-[250px]">
        <div className="p-6">
          <div className="flex justify-center">
            <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
          </div>

          <div className="mt-3 text-center sm:mt-4 w-full">
            <h2 className="text-xl font-semibold">Payment Failed!</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tighter text-balance">
              No worries, you wont be charged. Please try again!
            </p>

            <Button asChild className="w-full mt-5">
              <Link href="/">Go back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
