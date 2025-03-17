import {z} from "zod"

export const companySchema = z.object({
    name: z.string().min(2,"Company name must be atleast 2 characters"),
    location: z.string().min(1,"Location must be defined"),
    about: z.string().min(10,"Please provide some info about the company"),
    website: z.string().min(1,"Please enter a valid url"),
    logo: z.string().min(1,"Please upload a logo"),
    xAccount:  z.string().optional(),
})