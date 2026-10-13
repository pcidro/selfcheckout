"use client";
import { Product, Restaurant } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/formatCurrency";

interface ProductsDetailsProps {
  product: Product;
  restaurant: Pick<Restaurant, "avatarImageUrl" | "description" | "name">;
}

export default function ProductDetails({
  product,
  restaurant,
}: ProductsDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  function handleDecreaseQuantity() {
    if (quantity <= 1) {
      return;
    }

    setQuantity((prev) => prev - 1);
  }

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  return (
    <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl bg-white p-5">
      <div className="flex-auto overflow-y-auto">
        {/* RESTAURANTE */}
        <div className="flex items-center gap-1.5">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">{restaurant.name}</p>
        </div>

        {/* NOME DO PRODUTO */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* PREÇO E QUANTIDADE */}
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              className="h-8 w-8 rounded-xl"
              variant={"outline"}
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4 text-center">{quantity}</p>
            <Button
              className="h-8 w-8 rounded-xl"
              variant={"destructive"}
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* SOBRE */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* INGREDIENTES */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1.5">
            <ChefHatIcon size={18} />
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <ul className="list-disc space-y-1 px-5 text-sm text-muted-foreground">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      <Button className="mt-6 w-full rounded-full">
        Adicionar à sacola
      </Button>
    </div>
  );
}
