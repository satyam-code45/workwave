import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="fixed top-0 left-0 w-full border-b bg-background/80 backdrop-blur-md  z-50 supports-[backdrop-filter]:bg-background/60 ">
    <nav className="flex items-center justify-between py-5 px-5 mx-auto">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">
          Work<span className="text-primary ">Wave</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        {session?.user  ? (
          <form
            action={async ()=>{
              "use server";
              await signOut({redirectTo:"/"})
            }}
          >
          <Button>Logout</Button>
          </form>
        ):
        (
          <Link href={"/login"}
        >
        <Button>Login</Button>
        </Link>
        )}
        <ThemeToggle></ThemeToggle>
      </div>
    </nav>
    </header>
  );
};

export default Navbar;
