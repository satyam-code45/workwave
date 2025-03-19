"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { jobSchema } from "@/app/utils/zodschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import Image from "next/image";
import { countryList } from "@/app/utils/countriesLists";
import { useState } from "react";
import { SalaryRangeSelector } from "../general/salaryRangeSelector";
import { JobDescriptionEditor } from "../richTextEditor/JobDescriptionEditor";

export function CreateJobForm() {
  const [typedInput, setTypedInput] = useState("");

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      benefits: [],
      companyAbout: "",
      companyLocation: "",
      companyLogo: "",
      companyName: "",
      companyWebstie: "",
      companyXAccount: "",
      employmentType: "",
      jobDescription: "",
      jobTitle: "",
      listingDuration: 30,
      location: "",
      salaryFrom: 0,
      SalaryTo: 0,
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

  return (
    <Form {...form}>
      <form className="col-span-1 lg:col-span-2 flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent>
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
                        minSalary={10000}
                        maxSalary={1000000}
                        currency="USD"
                        step={2000}
                    />
                </FormControl>
              </FormItem>
            </div>

            <FormField 
                control={form.control}
                name="jobDescription"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                            <JobDescriptionEditor />
                        </FormControl>
                    </FormItem>
                )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
