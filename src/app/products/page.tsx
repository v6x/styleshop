"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { track } from "@/lib/analytics/track";

export default function ProductsPage() {
  const [query, setQuery] = useState("");

  const filtered = query
    ? products.filter(
        (p) =>
          p.name.includes(query) ||
          p.category.includes(query) ||
          p.description.includes(query),
      )
    : products;

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      const results = products.filter(
        (p) =>
          p.name.includes(value) ||
          p.category.includes(value) ||
          p.description.includes(value),
      );
      track("search_executed", {
        query: value,
        results_count: results.length,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">All Products</h1>
        <span className="text-sm text-gray-500">{filtered.length} products</span>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No results found for &quot;{query}&quot;.
        </p>
      )}
    </div>
  );
}
