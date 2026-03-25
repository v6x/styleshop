"use client";

import Link from "next/link";
import { Product } from "@/lib/types";

interface RecentlyViewedProps {
  items: Product[];
  currentProductId: string;
}

export function RecentlyViewed({ items, currentProductId }: RecentlyViewedProps) {
  const filtered = items.filter((p) => p.id !== currentProductId);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-lg font-bold mb-4">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="flex-shrink-0 w-36"
          >
            <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs text-gray-500">{product.category}</p>
            <p className="text-sm font-medium truncate">{product.name}</p>
            <p className="text-sm font-bold">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
