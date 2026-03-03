"use client";

import { CartItem } from "@/lib/types";

interface ReviewStepProps {
  items: CartItem[];
  totalPrice: number;
  shipping: { name: string; address: string; phone: string };
  onConfirm: () => void;
  onBack: () => void;
}

export function ReviewStep({
  items,
  totalPrice,
  shipping,
  onConfirm,
  onBack,
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="font-bold mb-4">Order Summary</h2>
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between text-sm py-2"
          >
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="font-bold mb-4">Shipping To</h2>
        <p className="text-sm text-gray-600">{shipping.name}</p>
        <p className="text-sm text-gray-600">{shipping.address}</p>
        <p className="text-sm text-gray-600">{shipping.phone}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold"
        >
          {`Pay $${totalPrice.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
