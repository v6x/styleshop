"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { track } from "@/lib/analytics/track";

interface VariantSelectorProps {
  product: Product;
}

export function VariantSelector({ product }: VariantSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);

    // BROKEN: product_id is number (type mismatch), product_name missing
    track("variant_selected", {
      product_id: Number(product.id),
      variant_type: "size",
      variant_value: size,
    });
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);

    // BROKEN: product_id is number (type mismatch), product_name missing
    track("variant_selected", {
      product_id: Number(product.id),
      variant_type: "color",
      variant_value: color,
    });
  };

  return (
    <div className="space-y-4">
      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`px-4 py-2 rounded border text-sm transition-colors ${
                  selectedSize === size
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 text-gray-600 hover:border-gray-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color selector */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`px-4 py-2 rounded border text-sm transition-colors ${
                  selectedColor === color
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 text-gray-600 hover:border-gray-900"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
