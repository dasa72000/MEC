"use client";

import { Heart } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 w-full bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <Heart className="h-8 w-8 fill-primary text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Movimiento Encuentros Conyugales
        </h1>
        <p className="text-md md:text-lg text-primary-foreground/90 mt-1">Censo 2026</p>
      </div>
    </header>
  );
}
