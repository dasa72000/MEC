"use client";

import { I18nProvider } from "react-aria-components";

export function AppI18nProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <I18nProvider locale="es">{children}</I18nProvider>;
}
