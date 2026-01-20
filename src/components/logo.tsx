import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Logo() {
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo');

  if (!logoImage) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <Image
        src={logoImage.imageUrl}
        alt={logoImage.description}
        width={100}
        height={100}
        data-ai-hint={logoImage.imageHint}
        className="rounded-lg"
      />
    </div>
  )
}
