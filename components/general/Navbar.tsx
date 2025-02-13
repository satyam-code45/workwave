import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">
          Work<span className="text-primary ">Wave</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <Button>Login</Button>
        <ThemeToggle></ThemeToggle>
      </div>
    </nav>
  );
};

export default Navbar;
