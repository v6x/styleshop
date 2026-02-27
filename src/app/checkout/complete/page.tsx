"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OrderComplete() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "N/A";

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <div className="text-4xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">주문이 완료되었습니다</h1>
        <p className="text-gray-500 mb-6">
          주문번호: <span className="font-mono">{orderId}</span>
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      }
    >
      <OrderComplete />
    </Suspense>
  );
}
