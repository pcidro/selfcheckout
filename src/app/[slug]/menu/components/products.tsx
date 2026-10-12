import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="space-y-3 px-1.5">
      {products.map((product) => (
        <Link
          className="flex items-center justify-between gap-2 border-b py-3"
          href={`/product${product.id}`}
          key={product.id}
        >
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="mt-2 text-sm font-semibold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              className="rounded-lg object-contain"
              src={product.imageUrl}
              alt={product.name}
              fill
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
