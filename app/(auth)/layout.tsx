import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  console.log("Auth Layout Loaded"); // Debugging
  return <>{children}</>; // Remove extra div
}
