import Navbar from "@/components/general/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LoadingMyJobs() {
  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
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
                <TableBody>
                  {[...Array(7)].map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="size-10 rounded-lg" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-3 w-[110px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-3 w-[160px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-3 w-[90px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-3 w-[160px]" />
                      </TableCell>
                      <TableCell className="flex gap-1 mt-4">
                        <Skeleton className="size-2 rounded-full" />
                        <Skeleton className="size-2 rounded-full" />
                        <Skeleton className="size-2 rounded-full" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableHeader>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
