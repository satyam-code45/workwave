/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateJobForm } from "@/components/forms/CreateJobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArcjetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
import Image from "next/image";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import requireUser from "../utils/requireUser";
import Navbar from "@/components/general/Navbar";

const companies = [
  { id: 0, name: "ArcJet", logo: ArcjetLogo },
  { id: 1, name: "Inngest", logo: InngestLogo },
  { id: 2, name: "ArcJet", logo: ArcjetLogo },
  { id: 3, name: "Inngest", logo: InngestLogo },
  { id: 4, name: "ArcJet", logo: ArcjetLogo },
  { id: 5, name: "Inngest", logo: InngestLogo },
];

const testimonials = [
  {
    quote:
      "The platform made hiring seamless we received top-notch candidates in no time",
    author: "Riya",
    company: "Innovatex",
  },
  {
    quote:
      "Highly impressed by the talent pool our team hired the perfect fit in just two days",
    author: "Arjun",
    company: "Nextgen Solutions",
  },
  {
    quote:
      "An excellent hiring experience the process was smooth and the candidates were exceptional",
    author: "Rahul",
    company: "Alpha Corp",
  },
  {
    quote:
      "The speed and quality of applications exceeded our expectations highly recommend this platform",
    author: "Priya",
    company: "Visionary Labs",
  },
];
const stats = [
  { id: 0, value: "10k+", label: "Monthly active job Seekers" },
  { id: 1, value: "48hr", label: "Average time to hire" },
  { id: 2, value: "95%", label: "Employer satisfaction rate" },
  { id: 3, value: "500+", label: "Companies hiring remotely" },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }

  return data;
}

async function PostJobsPage() {
  const session = await requireUser();

  const data = await getCompany(session.id as string);

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-18 lg:py-24">
        <Navbar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 px-5">
          <CreateJobForm
            companyAbout={data.about}
            companyLocation={data.location}
            companyLogo={data.logo}
            companyName={data.name}
            companyWebsite={data.website}
            companyXAccount={data.xAccount}
          />

          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="pt-5">
                  Trusted by Industry Leaders
                </CardTitle>
                <CardDescription>
                  Join thousands of Comapanies hiring top talent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ?Company Logos */}
                <div className="grid grid-cols-3 gap-4">
                  {companies.map((comapny) => (
                    <div key={comapny.id}>
                      <Image
                        src={comapny.logo}
                        alt={comapny.name}
                        width={80}
                        height={80}
                        className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <blockquote
                      key={index}
                      className="border-l-2 border-primary pl-4"
                    >
                      <p className="text-sm text-muted-foreground italic">
                      {`"${testimonial.quote}"`}
                      </p>
                      <footer className="mt-2 text-sm font-medium">
                        -{testimonial.author}, {testimonial.company}
                      </footer>
                    </blockquote>
                  ))}
                </div>

                {/* We will render stats here */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.id} className="rounded-lg bg-muted p-4">
                      <h4 className="text-2xl font-bold">{stat.value}</h4>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostJobsPage;
