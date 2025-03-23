"use client";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { countryList } from "@/app/utils/countriesLists";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export default function JobFilter() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";

  function clearAllFilter() {
    router.push("/");
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  function handleJobTypeChnage(jobType: string, checked: boolean) {
    const current = new Set(currentJobTypes);

    if (checked) {
      current.add(jobType);
    } else {
      current.delete(jobType);
    }

    const newValue = Array.from(current).join(",");

    router.push(`?${createQueryString("jobTypes", newValue)}`);
  }

  const [typedInput, setTypedInput] = useState("");

  function handleLocationChange(location: string) {
    router.push(`?${createQueryString("location", location)}`);
  }

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
    <Card className="h-fit">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
        <Button
          onClick={clearAllFilter}
          variant="destructive"
          size="sm"
          className="h-8"
        >
          <span>Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Job Type</Label>
          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((job, index) => (
              <div key={index} className="flex items-center space-x-1">
                <Checkbox
                  onCheckedChange={(checked) => {
                    handleJobTypeChnage(job, checked as boolean);
                  }}
                  id={job}
                  checked={currentJobTypes.includes(job)}
                />
                <Label htmlFor={job} className="text-sm font-medium ">
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Location</Label>
          <Select
            onValueChange={(location) => {
              handleLocationChange(location);
            }}
            value={currentLocation}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent
              onKeyDown={(e) => {
                if (e.key.length === 1 || e.key === "Backspace") {
                  setTypedInput((prev) =>
                    e.key === "Backspace" ? prev.slice(0, -1) : prev + e.key
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
                    <SelectItem key={country.code} value={country.name}>
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
        </div>
      </CardContent>
    </Card>
  );
}
