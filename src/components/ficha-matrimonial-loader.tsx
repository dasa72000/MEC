"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FichaMatrimonialForm } from "@/components/ficha-matrimonial-form";
import { I18nProvider } from "react-aria-components";

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
    // This effect runs only on the client, after the initial render
    setIsClient(true);
  }, []);

  // On the server and during the initial client render, show the skeleton
  if (!isClient) {
    return <LoadingSkeleton />;
  }

  // Once the component has mounted on the client, render the actual form
  return (
    <I18nProvider locale="es">
      <FichaMatrimonialForm />
    </I18nProvider>
  );
}
