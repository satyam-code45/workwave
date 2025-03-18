import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import Github from "@/public/Github";
import Google from "@/public/Google";
import { auth, signIn } from "@/app/utils/auth";
import GeneralSubmitButtons from "../general/SubmitButtons";
import { redirect } from "next/navigation";

const  LoginForm = async () => {

  const session = await auth();
  if (session?.user) {
    return redirect("/")
  }

  return (
    <div className="flex flex-col gap-6 ">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">
            Sign in to WorkWave
          </CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center flex-col space-y-4 ">
            <div className="flex space-x-4">
              <form
                className="flex w-full"
                action={async () => {
                  "use server";

                  await signIn("google", {
                    redirectTo: "/onboarding",
                  });
                }}
              >

                <GeneralSubmitButtons
                  text={"Google"}
                  icon={<Google />}
                  variantButton="secondary"
                  width="w-full"
                />
              </form>
              <form
                className="flex w-full"
                action={async () => {
                  "use server";

                  await signIn("github", {
                    redirectTo: "/onboarding",
                  });
                }}
              >
                <GeneralSubmitButtons
                  text={"Github"}
                  icon={<Github />}
                  variantButton="secondary"
                  width="w-full"
                />
              </form>
            </div>
            <p className="text-center text-muted-foreground">or</p>
            <div className="flex flex-col space-y-3">
              <p className="text-sm">Email address or username</p>
              <Input placeholder="Email address or username"></Input>

              <GeneralSubmitButtons
                text={"Submit"}
                variantButton="secondary"
                width="w-full"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="my-8 flex justify-center">
          <p className="text-muted-foreground">
            Don’t have an account?
            <span className="text-foreground">Sign up</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
