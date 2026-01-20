import { FichaMatrimonialForm } from "@/components/ficha-matrimonial-form";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background">
      <div className="w-full max-w-5xl space-y-8">
        <header className="text-center space-y-2">
          <Logo />
          <h1 className="text-4xl font-headline font-bold text-primary">
            Ficha Matrimonial
          </h1>
          <p className="text-muted-foreground">
            Complete todos los campos del formulario.
          </p>
        </header>

        <FichaMatrimonialForm />
      </div>
    </main>
  );
}
