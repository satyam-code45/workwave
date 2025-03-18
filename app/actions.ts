"use server"

import requireUser from "./utils/requireUser"
import {z} from "zod"
import { companySchema, jobSeekerSchema } from "./utils/zodschema";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";



export async function createCompany(data: z.infer<typeof companySchema>) {
    //check first user is logged in
    const session = await requireUser();
    
    //validate the inputs against company Schema

    const validateData = companySchema.parse(data);

    //push to database
    
    await prisma.user.update({
        where:{
            id: session.id
        },
        data:{
            onboardingCompleted: true,
            userType: "COMPANY",
            Company: {
                create:{
                    ...validateData, 
                }
            }
        }
    });

    return redirect("/")
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
    //check first user is logged in
    const session = await requireUser();
    
    //validate the inputs against jobSeeker Schema

    const validateData = jobSeekerSchema.parse(data);

    //push to database
    
    await prisma.user.update({
        where:{
            id: session.id as string
        },
        data:{
            onboardingCompleted: true,
            userType: "JOB_SEEKER",
            JobSeeker: {
                create:{
                    ...validateData, 
                }
            }
        }
    });

    return redirect("/")
}