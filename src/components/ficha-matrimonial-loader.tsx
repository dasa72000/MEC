"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FichaMatrimonialForm } from "@/components/ficha-matrimonial-form";

const LoadingSkeleton = () => (
    <div className="space-y-8">
        <Skeleton className="h-[148px] w-full rounded-lg" />
        <Skeleton className="h-[438px] w-full rounded-lg" />
        <Skeleton className="h-[250px] w-full rounded-lg" />
        <Skeleton className="h-[318px] w-full rounded-lg" />
        <div className="flex justify-end">
            <Skeleton className="h-11 w-28 rounded-md" />
        </div>
    </div>
);


export function FichaMatrimonialLoader() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingSkeleton />;
  }

  return (
      <FichaMatrimonialForm />
  );
}
