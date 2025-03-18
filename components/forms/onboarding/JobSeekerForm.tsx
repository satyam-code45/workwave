import { jobSeekerSchema } from "@/app/utils/zodschema";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
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
        }
    })
    //once you created the zod schema and done with creating the react hook form now create ui for it
  return (
    <Form >
        <form>

        </form>
    </Form>
  )
}
