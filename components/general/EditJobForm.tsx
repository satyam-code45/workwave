"use client"
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SalaryRangeSelector } from "./salaryRangeSelector";
import { JobDescriptionEditor } from "../richTextEditor/JobDescriptionEditor";
import BenefitsSelector from "./BenefitsSelector";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/app/utils/zodschema";
import { z } from "zod";
import { countryList } from "@/app/utils/countriesLists";
import { editJobPost } from "@/app/actions";
import { useForm } from "react-hook-form";

interface EditJobFormProps {
  jobPost: {
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    jobDescription: string;
    listingDuration: number;
    benefits: string[];
    id: string;
    Company: {
      location: string;
      name: string;
      about: string;
      website: string;
      logo: string;
      xAccount: string | null;
    };
    SalaryTo: number;
  };
}

export function EditJobForm({ jobPost }: EditJobFormProps) {
  const [typedInput, setTypedInput] = useState("");

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      benefits: jobPost.benefits,
      companyAbout: jobPost.Company.about,
      companyLocation: jobPost.Company.location,
      companyName: jobPost.Company.name,
      companyWebsite: jobPost.Company.website,
      companyXAccount: jobPost.Company.xAccount || "",
      employmentType: jobPost.employmentType,
      jobDescription: jobPost.jobDescription,
      jobTitle: jobPost.jobTitle,
      location: jobPost.location,
      salaryFrom: jobPost.salaryFrom,
      salaryTo: jobPost.SalaryTo,
      companyLogo: jobPost.Company.logo,
      listingDuration: jobPost.listingDuration,
    },
  });

  const filteredCountries = countryList
    .filter((country) =>
      country.name.toLowerCase().includes(typedInput.toLowerCase())
    )
    .sort((a, b) => {
      if (a.name.toLowerCase() === typedInput.toLowerCase()) return -1;
      if (b.name.toLowerCase() === typedInput.toLowerCase()) return 1;
      return 0;
    });

  const [pending, setPending] = useState(false);
  async function onSubmit(values: z.infer<typeof jobSchema>) {
    try {
      setPending(true);

      await editJobPost(values,jobPost.id);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log(
          "something went wrong in the onSubmit Handler in CompanyForm"
        );
      }
    } finally {
      setPending(false);
    }
  }

  const onError = (errors: any) => {
    console.log("❌ Form submission failed due to validation errors", errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="col-span-1 lg:col-span-2 flex flex-col gap-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Titile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Employment Type</SelectLabel>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="text-left ">
                    <FormLabel className="pl-3">Job Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        onKeyDown={(e) => {
                          if (e.key.length === 1 || e.key === "Backspace") {
                            setTypedInput((prev) =>
                              e.key === "Backspace"
                                ? prev.slice(0, -1)
                                : prev + e.key
                            );
                          }
                        }}
                      >
                        <SelectGroup>
                          <SelectLabel>WorldWide</SelectLabel>
                          <SelectItem value="worldwide">
                            <div className="flex">
                              <Image
                                src="/world.png"
                                alt="World"
                                width={20}
                                height={20}
                              />
                              <div className="pl-2">Worldwide / Remote</div>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Country</SelectLabel>
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.name}
                              >
                                <span>{country.flagEmoji}</span>
                                <span className="pl-2">{country.name}</span>
                              </SelectItem>
                            ))
                          ) : (
                            <p className="p-2 text-center text-gray-500">
                              No results found
                            </p>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <SalaryRangeSelector
                    control={form.control}
                    minSalary={30000}
                    maxSalary={1000000}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.salaryFrom?.message ||
                    form.formState.errors.salaryTo?.message}
                </FormMessage>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field as any} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <BenefitsSelector field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Submitting......</span>
            </>
          ) : (
            "Update Job"
          )}
        </Button>
      </form>
    </Form>
  );
}
