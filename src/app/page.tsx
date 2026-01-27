import { AppHeader } from "@/components/app-header";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const FichaMatrimonialForm = dynamic(
  () => import('@/components/ficha-matrimonial-form').then(mod => mod.FichaMatrimonialForm),
  { 
    ssr: false,
    loading: () => (
      <div className="space-y-8">
        <Skeleton className="h-[148px] w-full rounded-lg" />
        <Skeleton className="h-[438px] w-full rounded-lg" />
        <Skeleton className="h-[250px] w-full rounded-lg" />
        <Skeleton className="h-[318px] w-full rounded-lg" />
        <div className="flex justify-end">
          <Skeleton className="h-11 w-28 rounded-md" />
        </div>
      </div>
    ),
  }
);


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-5xl">
          <FichaMatrimonialForm />
        </div>
      </main>
    </div>
  );
}
