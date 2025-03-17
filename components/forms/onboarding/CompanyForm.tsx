import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/app/utils/zodschema";
import { z } from "zod";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { countryList } from "@/app/utils/countriesLists";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/general/UploadThingReexported";

const CompanyForm = () => {
  const [typedInput, setTypedInput] = useState("");
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      about: "",
      location: "",
      logo: "",
      name: "",
      website: "",
      xAccount: "",
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
      <form className="space-y-6">
        <div className="gird grid-cols-1 space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="pl-3">Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="text-left ">
                <FormLabel className="pl-3">Location</FormLabel>
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
                    <SelectGroup>Country</SelectGroup>
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
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="pl-3">Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="xAccount"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="pl-3">X Account</FormLabel>
                <FormControl>
                <Input placeholder="@yourcompany" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="pl-3">About</FormLabel>
                <FormControl>
                <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="pl-3">Company Logo</FormLabel>
                <FormControl>
                  <UploadDropzone endpoint={"imageUploader"}
                    onClientUploadComplete={(res)=>{
                      console.log(res);
                      
                      field.onChange(res[0].ufsUrl)
                    }}
                    onUploadError={(error)=>{
                      console.log(error);
                    }}
                    className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CompanyForm;
