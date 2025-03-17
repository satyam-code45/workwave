import { redirect } from "next/navigation";
import { auth } from "./auth"

const requireUser = async () => {
 const session = await auth();
 if (!session?.user) {
   return redirect("/login")
 }
 return session.user;
}

export default requireUser