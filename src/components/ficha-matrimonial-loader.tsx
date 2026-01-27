"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { I18nProvider } from "react-aria-components";
import dynamic from "next/dynamic";

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

const FichaMatrimonialFormWithNoSSR = dynamic(
  () => import("@/components/ficha-matrimonial-form").then((mod) => mod.FichaMatrimonialForm),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />,
  }
);

export function FichaMatrimonialLoader() {
  return (
    <I18nProvider locale="es">
      <FichaMatrimonialFormWithNoSSR />
    </I18nProvider>
  );
}
