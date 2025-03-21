"use client";
import { countryList } from "@/app/utils/countriesLists";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import Image from "next/image";
import React, { useState } from "react";
import { SelectValue } from "@radix-ui/react-select";


export default function JobFilteredCountryList() {

  const [typedInput, setTypedInput] = useState("");

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
    <>
      <Select>
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
                <Image src="/world.png" alt="World" width={20} height={20} />
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
              <p className="p-2 text-center text-gray-500">No results found</p>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
