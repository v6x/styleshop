"use client";

const CATEGORIES = ["All", "Outerwear", "Tops", "Bottoms", "Dresses", "Accessories", "Shoes"];
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

interface FilterBarProps {
  query: string;
  category: string;
  sort: string;
  resultsCount: number;
  onQueryChange: (q: string) => void;
  onCategoryChange: (c: string) => void;
  onSortChange: (s: string) => void;
}

export function FilterBar({
  query,
  category,
  sort,
  resultsCount,
  onQueryChange,
  onCategoryChange,
  onSortChange,
}: FilterBarProps) {
  const handleSearch = (value: string) => {
    onQueryChange(value);
  };

  const handleCategoryChange = (cat: string) => {
    onCategoryChange(cat);
  };

  const handleSortChange = (value: string) => {
    onSortChange(value);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
      />

      {/* Category filter + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                category === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-300 text-gray-600 hover:border-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
