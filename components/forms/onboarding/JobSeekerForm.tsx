import { createJobSeeker } from "@/app/actions";
import { jobSeekerSchema } from "@/app/utils/zodschema";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function JobSeekerForm() {
  //created the react hook form
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      about: "",
      name: "",
      resume: "",
    },
  });
  //once you created the zod schema and done with creating the react hook form now create ui for it

  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      await createJobSeeker(data);
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

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="gird grid-cols-1 space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="pl-3">
                  Full Name <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Full Name" {...field} />
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
                <FormLabel className="pl-3">
                  About<span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="pl-3">
                  Resume (PDF)<span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={"/pdf.svg"}
                        alt="pdf"
                        width={70}
                        height={70}
                        className="rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="link"
                        className="absolute  -top-2 -right-2 h-3 w-3"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint={"resumeUploader"}
                      onClientUploadComplete={(res) => {
                        console.log(res);

                        field.onChange(res[0].ufsUrl);
                      }}
                      onUploadError={(error) => {
                        console.log(error);
                      }}
                      className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
}
