"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true;
  };
}>;

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategory: {
        include: {
          products: true;
        };
      };
    };
  }>;
}

export default function Categories({ restaurant }: RestaurantCategoriesProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategory[0]);
  function handleCategoryClick(category: MenuCategoryWithProducts) {
    setSelectedCategory(category);
  }
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <div className="flex items-center gap-1 text-xs text-green-600">
            <ClockIcon size={12} />
            <p>Aberto!</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{restaurant.name}</h1>
          <p className="text-xs text-muted-foreground">
            {restaurant.description}
          </p>
        </div>
      </div>

      <ScrollArea className="mt-4 w-full">
        <div className="flex w-max gap-1">
          {restaurant.menuCategory.map((category) => (
            <Button
              className="rounded-full"
              size={"sm"}
              variant={
                selectedCategory.id === category.id ? "default" : "secondary"
              }
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h3 className="mt-6 pt-8 text-xl font-semibold">
        {selectedCategory.name}
      </h3>
      <Products products={selectedCategory.products} />
    </div>
  );
}
