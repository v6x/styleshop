import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { PromoBanner } from "@/components/promo-banner";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-12 sm:py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Style Your Life
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          트렌디한 패션 아이템을 만나보세요. 매주 새로운 스타일이 업데이트됩니다.
        </p>
        <Link
          href="/products"
          className="inline-block mt-8 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          쇼핑하기
        </Link>
      </section>

      {/* Promo Banner — BROKEN 이벤트 (discount_percentage 누락) */}
      <section className="mb-12">
        <PromoBanner
          title="윈터 세일"
          description="겨울 아이템 최대 할인"
          discount={30}
          link="/products"
        />
      </section>

      {/* Featured Products */}
      <section className="pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">추천 상품</h2>
          <Link
            href="/products"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
