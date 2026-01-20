import { FichaMatrimonialForm } from "@/components/ficha-matrimonial-form";
import { AppHeader } from "@/components/app-header";

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
