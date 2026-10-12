"use client";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductsHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}

export default function ProductsHeader({ product }: ProductsHeaderProps) {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="secondary"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />
      <Button
        variant="secondary"
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
