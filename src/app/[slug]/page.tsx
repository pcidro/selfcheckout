import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/getRestaurantBySlug";

import MethodOption from "./components/methodOption";

interface RestaurantePageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantePage({
  params,
}: RestaurantePageProps) {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
        <p className="text-muted-foreground">{restaurant.description}</p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 pt-14">
          <MethodOption
            imageUrl="/dinein.png"
            option="DINE_IN"
            slug={restaurant.slug}
            imageAlt="Para comer aqui"
            buttonText="Para comer aqui"
          />
          <MethodOption
            imageUrl="/takeaway.png"
            option="TAKEAWAY"
            slug={restaurant.slug}
            imageAlt="Para delivery"
            buttonText="Para delivery"
          />
        </div>
      </div>
    </div>
  );
}
