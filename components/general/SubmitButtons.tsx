"use client";

import React, { ReactElement } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GeneralSubmitButtonsProps {
  text: string;
  icon?: ReactElement;
  variantButton?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  width?: string;
}

export function GeneralSubmitButtons({
  text,
  icon,
  variantButton,
  width,
}: GeneralSubmitButtonsProps) {
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
          {icon}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}

export function SaveJobButton({savedJob} : {savedJob : boolean}) {
  const { pending } = useFormStatus();

  return (
    <Button variant="outline" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {savedJob ? "Unsaving..." : "Saving..."}
        </>
      ) : (
        <>
          <Heart  className={cn(
            savedJob ? "fill-current text-primary" : "",
            "size-4 transition-colors"
          )}/>
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
}
