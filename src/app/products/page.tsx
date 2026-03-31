"use client";

import { useState, useMemo, useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { FilterBar } from "@/components/filter-bar";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = products;

    // Category filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Search filter
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sort) {
      case "price_asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [query, category, sort]);

  useEffect(() => {
    const listType = query ? "search" : category !== "All" ? "category" : "collection";
    const listId = query ? query : category !== "All" ? category : "all_products";
    const listName = query ? `Search: ${query}` : category !== "All" ? category : "All Products";
    const activeFilters = [];
    if (category !== "All") activeFilters.push(`category: ${category}`);
    if (query) activeFilters.push(`query: ${query}`);

    amplitude.track("product_list_viewed", {
      list_type: listType,
      list_id: listId,
      list_name: listName,
      total_results: filtered.length,
      page_number: 1,
      sort_order: sort,
      filters_applied: activeFilters.length > 0 ? activeFilters.join(", ") : "none",
    });
  }, [filtered, query, category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">All Products</h1>
        <span className="text-sm text-gray-500">{filtered.length} products</span>
      </div>

      <FilterBar
        query={query}
        category={category}
        sort={sort}
        resultsCount={filtered.length}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No results found{query ? ` for "${query}"` : ""}.
        </p>
      )}
    </div>
  );
}
