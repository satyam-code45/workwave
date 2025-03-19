import {z} from "zod"

export const companySchema = z.object({
    name: z.string().min(2,"Company name must be atleast 2 characters"),
    location: z.string().min(1,"Location must be defined"),
    about: z.string().min(10,"Please provide some info about the company"),
    website: z.string().min(1,"Please enter a valid url"),
    logo: z.string().min(1,"Please upload a logo"),
    xAccount:  z.string().optional(),
})

export const jobSeekerSchema = z.object({
    name: z.string().min(2,"Name must be atleast 2 characters"),
    about: z.string().min(10,"Please provide more info about yourself"),
    resume: z.string().min(1,"Please upload a resume")
})

export const jobSchema = z.object({
  jobTitle:   z.string().min(2,"Job title must be atleast 2 characters long"),
  employmentType: z.string().min(1,"Please select an employment type"),
  location:    z.string().min(1,"Please select a location"),
  salaryFrom:     z.number().min(1,"Salary From is required"),
  SalaryTo:      z.number().min(1,"Salary To is required"),
  jobDescription:  z.string().min(1,"Job Description is required"),
  listingDuration: z.number().min(1,"Listing Duration is required"),
  benefits:        z.array(z.string()).min(1,"Please select atleast 1 benefit"),

  companyName:   z.string().min(1,"Company name is required"),
  companyLocation:   z.string().min(1,"Company location is required"),
  companyAbout:   z.string().min(10,"Company about is required"),
  companyLogo:   z.string().min(1,"Company logo is required"),
  companyWebstie:   z.string().min(1,"Company website is required"),
  companyXAccount:   z.string().optional()
})