"use client";

import { Heart } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 w-full bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-center p-3 text-center sm:p-4">
        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <Heart className="h-7 w-7 fill-primary text-primary" />
        </div>
        <h1 className="text-2xl font-bold font-headline sm:text-3xl md:text-4xl">
          Movimiento Encuentros Conyugales
        </h1>
        <p className="text-base text-primary-foreground/90 mt-1 md:text-lg">Censo 2026</p>
        <p className="text-xs text-primary-foreground/70 mt-1">Version: 2026.1.31</p>
      </div>
    </header>
  );
}
