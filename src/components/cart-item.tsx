"use client";

import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/lib/cart-store";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-24 object-cover rounded-md"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{item.product.category}</p>
        <h3 className="font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm font-bold mt-1">
          {item.product.price.toLocaleString()}원
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="w-8 h-8 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="w-8 h-8 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeItem(item.product.id)}
        className="text-gray-400 hover:text-gray-600 text-sm"
      >
        삭제
      </button>
    </div>
  );
}
