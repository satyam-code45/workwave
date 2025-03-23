/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/general/Navbar";
import { prisma } from "../utils/db";
import requireUser from "../utils/requireUser";
import { EmptyState } from "@/components/general/EmptyState";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  PenBoxIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import CopyLink from "@/components/general/CopyLink";

async function getJobs(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: {
      Company: {
        userId: userId,
      },
    },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      Company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function MyJobs() {
  const session = await requireUser();
  const data = await getJobs(session.id as string);
  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <div>
          {data.length === 0 ? (
            <div className="flex items-center justify-center">
              <EmptyState
                buttonText="Create a Job now"
                description="You do not have listed any job yet."
                href={`/post-job`}
                title="No Listed Jobs found"
              />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>My Jobs</CardTitle>
                <CardDescription>
                  Manage Your job Listings and applications here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Logo</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((listing: any) => (
                      <TableRow key={listing.id}>
                        <TableCell>
                          <Image
                            src={listing.Company.logo}
                            alt={listing.Company.name}
                            width={40}
                            height={48}
                            className="rounded-lg size-10"
                          />
                        </TableCell>
                        <TableCell>
                          {listing.Company.name.charAt(0).toUpperCase() +
                            listing.Company.name.slice(1)}
                        </TableCell>
                        <TableCell>
                          {listing.jobTitle.charAt(0).toUpperCase() +
                            listing.jobTitle.slice(1)}
                        </TableCell>
                        <TableCell>
                          {listing.status.charAt(0).toUpperCase() +
                            listing.status.slice(1).toLowerCase()}
                        </TableCell>
                        <TableCell>
                          {listing.createdAt.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/my-jobs/${listing.id}/edit`}>
                                  <PenBoxIcon className="size-4" />
                                  <span className="text-white">Edit Job</span>
                                </Link>
                              </DropdownMenuItem>
                              <CopyLink jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${listing.id}`}/>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/my-jobs/${listing.id}/delete`}>
                                  <Trash2 className="size-4 text-red-800" />
                                  <span className="text-red-800 font-semibold">
                                    Delete
                                  </span>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
