import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import React from "react";

const login = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={"/"} className="flex items-center gap-2 self-center">
          <h1 className="text-2xl font-bold">
            Work<span className="text-primary ">Wave</span>
          </h1>
        </Link>

        <LoginForm />
      </div>
    </div>
  );
};

export default login;
