"use client";

import * as amplitude from '@amplitude/analytics-browser';
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/lib/cart-store";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
    amplitude.track('cart_item_quantity_updated', {
      product_id: item.product.id,
      product_name: item.product.name,
      new_quantity: newQuantity,
      price: item.product.price,
    });
  };

  const handleRemove = () => {
    removeItem(item.product.id);
    amplitude.track('cart_item_removed', {
      product_id: item.product.id,
      product_name: item.product.name,
      product_category: item.product.category,
      price: item.product.price,
      quantity: item.quantity,
    });
  };

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
          {`${item.product.price.toFixed(2)}`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
      <button
        onClick={handleRemove}
        className="text-gray-400 hover:text-gray-600 text-sm"
      >
        Remove
      </button>
    </div>
  );
}
