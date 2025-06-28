import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/app/utils/auth";
import UserDropdown from "./UserDropdown";

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

        {/* Desktop navigation */}

        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          <Link className={buttonVariants({ size: "lg" })} href={"/post-job"}>
            Post Job
          </Link>
          {session?.user ? (
            <UserDropdown 
              email={session.user.email as string}
              image={session.user.image as string}
              name={session.user.name as string}
            />
          ) : (
            <Link href={"/login"} className={buttonVariants({variant: 'outline', size: "lg" })}>Login</Link>
          )

          }
        </div>    
      </nav>
    </header>
  );
};

export default Navbar;
