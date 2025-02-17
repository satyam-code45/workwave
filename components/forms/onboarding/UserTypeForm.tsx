import { Button } from "@/components/ui/button";
import { Building2, User2 } from "lucide-react";
import React from "react";

type UserSelectionType = "company" |"jobSeeker";

interface UserTypeselectionProps{
    onSelect: (type: UserSelectionType) => void
}

const UserTypeForm = ({onSelect}:UserTypeselectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome! Lets get Started</h2>
        <p className="text-muted-foreground">
          Choose how would you like to use our platform!
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          variant={"outline"}
          className="w-full h-auto p-6 items-center justify-start gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
          onClick={()=> onSelect("company")}
        >
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="size-6 text-primary"/>
            </div>
            <div className="text-left">
                <h3 className="font-semibold text-lg">Company / Organization</h3>
                <p >Posts jobs and find exceptional talent</p>
            </div>
        </Button>
        <Button
          variant={"outline"}
          className="w-full h-auto p-6 items-center justify-start gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
          onClick={()=> onSelect("jobSeeker")}
        >
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User2 className="size-6 text-primary"/>
            </div>
            <div className="text-left">
                <h3 className="font-semibold text-lg">Job Seeker</h3>
                <p >Find your dream job</p>
            </div>
        </Button>
      </div>
    </div>
  );
};

export default UserTypeForm;
