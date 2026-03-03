"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/types";

const STORAGE_KEY = "styleshop_recently_viewed";
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  const add = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const filtered = prev.filter((p) => p.id !== product.id);
        const updated = [product, ...filtered].slice(0, MAX_ITEMS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    [],
  );

  return { items, add };
}
