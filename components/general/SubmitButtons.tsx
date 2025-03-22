"use client"

import React, { ReactElement } from "react";
import { Button, ButtonProps } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface GeneralSubmitButtonsProps{
    text: String,
    icon?: ReactElement,
    variantButton?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
    width?: string
}

export function GeneralSubmitButtons({text,icon,variantButton,width}: GeneralSubmitButtonsProps){
  const { pending } = useFormStatus();
  return (
    <Button variant={variantButton} className={width} disabled={pending}>

      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Submitting......</span>
        </>
      ) : (
        <>
          {icon}<span>{text}</span>
        </>
      )}
    </Button>
  );
};

export function SaveJobButton(){
  const {pending} = useFormStatus()

  return(
    <Button variant="outline" type="submit" disabled={pending}>

    </Button>
  )
}
