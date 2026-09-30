import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/getRestaurantBySlug";

import HeaderMenu from "./components/header";

export default async function PageMenu({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionmethod: string }>;
}) {
  const isConsumptionMethodValid = (value: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(value.toUpperCase());
  };

  const { slug } = await params;
  const { consumptionmethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionmethod)) {
    return notFound();
  }

  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <HeaderMenu restaurant={restaurant} />
    </div>
  );
}
