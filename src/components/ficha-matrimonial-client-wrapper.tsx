"use client";

import { I18nProvider } from "react-aria-components";
import { FichaMatrimonialForm } from "./ficha-matrimonial-form";

export function FichaMatrimonialClientWrapper() {
  return (
    <I18nProvider locale="es">
      <FichaMatrimonialForm />
    </I18nProvider>
  );
}
