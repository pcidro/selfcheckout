"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";

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
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white p-2">
      <div className="flex items-center gap-3">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={45}
          height={45}
          className="rounded-full object-cover"
        />
        <div className="flex w-full flex-col">
          <h1 className="text-lg font-semibold">{restaurant.name}</h1>
          <p className="text-xs text-muted-foreground">
            {restaurant.description}
          </p>
        </div>
        <div className="flex flex-col text-xs text-green-600">
          <div className="flex items-center gap-1">
            <ClockIcon size={12} />
            <p>Aberto!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
