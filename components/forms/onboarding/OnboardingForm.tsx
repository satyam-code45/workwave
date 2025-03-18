"use client"
import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserTypeForm from "./UserTypeForm";
import CompanyForm from "./CompanyForm";
import JobSeekerForm from "./JobSeekerForm";

type UserSelectionType = "company" |"jobSeeker" | null;

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelection(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }

  function renderStep(){
    switch(step){
      case 1: 
        return <UserTypeForm onSelect={handleUserTypeSelection}/>

      case 2:
        return userType === "company" ? (
          <CompanyForm/>
        ) : (
          <JobSeekerForm/>
        )

      default :
       return null;
    }
  }
  return (
    <>
      <div>
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">
            Work<span className="text-primary ">Wave</span>
          </h1>
        </Link>
      </div>
      <Card className="max-w-lg w-full py-1 mt-2">
        <CardContent className="p-6 text-center">
          {renderStep()}
        </CardContent>
      </Card>
    </>
  );
};

export default OnboardingForm;
