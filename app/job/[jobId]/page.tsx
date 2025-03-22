import arcjet, { detectBot, tokenBucket } from "@/app/utils/arcjet";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/listOfBenefits";
import { JsonToHtlm } from "@/components/general/JsonToHtlm";
import Navbar from "@/components/general/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { request } from "@arcjet/next";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      })
    );
  }
}

async function getJob(id: string) {
  const jobData = await prisma.jobPost.findUnique({
    where: {
      id: id,
      status: "ACTIVE",
    },
    select: {
      jobDescription: true,
      jobTitle: true,
      location: true,
      employmentType: true,
      benefits: true,
      createdAt: true,
      listingDuration: true,
      Company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
  });

  if (!jobData) {
    return notFound();
  }

  return jobData;
}

type Params = Promise<{ jobId: string }>;

export default async function JobIdPage({ params }: { params: Params }) {
  const { jobId } = await params;

  const session = await auth();
  const req = await request();
  const decision = await getClient(!!session).protect(req, {requested: 10});

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const data = await getJob(jobId);
  return (
    <div>
      <Navbar />

      <section className="w-full py-12 px-6 md:px-12 md:py-18 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-8 col-span-2">
            {/* header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{data.jobTitle}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <p className="font-medium">{data.Company.name}</p>
                  <span className="hidden md:inline text-muted-foreground">
                    |
                  </span>
                  <Badge className="rounded-lg" variant="secondary">
                    {data.employmentType}
                  </Badge>
                  <span className="hidden md:inline text-muted-foreground">
                    |
                  </span>
                  <Badge className="rounded-lg" variant="secondary">
                    {data.location}
                  </Badge>
                </div>
              </div>

              {/* <Button variant="outline">
                <Heart className="size-4" />
                Save Job
              </Button> */}

              {session?.user ? (
                <form></form>
              ): (
                <Link href="/login" className={buttonVariants({variant: "outline"})}>
                <Heart className="size-4" />
                Save Job
              </Link>
              )}
            </div>

            <section>
              <JsonToHtlm json={JSON.parse(data.jobDescription)} />
            </section>

            <section>
              <h3 className="font-semibold mb-4">Benefits</h3>

              <div className="flex flex-wrap gap-3">
                {benefits.map((benefit) => {
                  const isOffered = data.benefits.includes(benefit.id);
                  return (
                    <Badge
                      className={cn(
                        isOffered ? "" : "opacity-75 cursor-not-allowed",
                        "text-sm px-4 py-1.5 rounded-lg"
                      )}
                      key={benefit.id}
                      variant={isOffered ? "default" : "outline"}
                    >
                      <span className="flex items-center gap-2">
                        {benefit.icon}
                        {benefit.label}
                      </span>
                    </Badge>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Apply Now</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please let {data.Company.name} know you found this job on
                    WorkWave. This help us grow!
                  </p>
                </div>
                <Button className="w-full">Apply Now</Button>
              </div>
            </Card>

            {/* Job details card */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">About the Job</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Apply Before
                  </span>
                  <span className="text-sm">
                    {new Date(
                      data.createdAt.getTime() +
                        data.listingDuration * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Posted on
                  </span>
                  <span className="text-sm">
                    {data.createdAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Employment Type
                  </span>
                  <span className="text-sm">{data.employmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Location
                  </span>
                  <span className="text-sm">{data.location}</span>
                </div>
              </div>
            </Card>

            {/* Company Card */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={data.Company.logo}
                    alt={data.Company.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold">{data.Company.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {data.Company.about}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
