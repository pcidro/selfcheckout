import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductsHeader from "./components/productsHeader";

interface ProductsPageProps {
  params: Promise<{ slug: string; productid: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { productid } = await params;
  const product = await db.product.findUnique({
    where: {
      id: productid,
    },
  });
  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="relative h-[300px] w-full">
        <ProductsHeader product={product} />
      </div>
    </div>
  );
}
