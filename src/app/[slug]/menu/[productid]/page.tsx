import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/getRestaurantBySlug";
import { db } from "@/lib/prisma";

import ProductDetails from "./components/productDetails";
import ProductsHeader from "./components/productsHeader";

interface ProductsPageProps {
  params: Promise<{ slug: string; productid: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { slug, productid } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  const product = await db.product.findUnique({
    where: {
      id: productid,
    },
  });
  if (!product) {
    return notFound();
  }

  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-full flex-col">
      <div className="relative h-[300px] w-full shrink-0">
        <ProductsHeader product={product} />
      </div>
      <ProductDetails product={product} restaurant={restaurant} />
    </div>
  );
}
