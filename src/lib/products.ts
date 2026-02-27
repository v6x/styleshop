import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "클래식 오버사이즈 블레이저",
    price: 189000,
    originalPrice: 249000,
    image: "https://picsum.photos/seed/blazer/400/500",
    category: "아우터",
    description:
      "편안한 핏의 오버사이즈 블레이저. 캐주얼과 포멀 모두 연출 가능한 베이직 아이템.",
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "2",
    name: "소프트 캐시미어 니트",
    price: 129000,
    image: "https://picsum.photos/seed/cashmere/400/500",
    category: "상의",
    description: "부드러운 캐시미어 블렌드 니트. 따뜻하면서도 가벼운 착용감.",
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: "3",
    name: "와이드 핏 코튼 팬츠",
    price: 89000,
    image: "https://picsum.photos/seed/widepants/400/500",
    category: "하의",
    description:
      "여유로운 와이드 실루엣의 코튼 팬츠. 편안한 데일리 룩에 제격.",
    rating: 4.3,
    reviewCount: 89,
  },
  {
    id: "4",
    name: "리넨 블렌드 셔츠 원피스",
    price: 159000,
    originalPrice: 199000,
    image: "https://picsum.photos/seed/shirtdress/400/500",
    category: "원피스",
    description:
      "시원한 리넨 소재의 셔츠 원피스. 벨트로 웨이스트 라인 조절 가능.",
    rating: 4.6,
    reviewCount: 167,
  },
  {
    id: "5",
    name: "미니멀 레더 토트백",
    price: 239000,
    image: "https://picsum.photos/seed/totebag/400/500",
    category: "액세서리",
    description: "깔끔한 디자인의 소프트 레더 토트백. 넉넉한 수납공간.",
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "6",
    name: "클래식 첼시 부츠",
    price: 198000,
    originalPrice: 258000,
    image: "https://picsum.photos/seed/chelseaboot/400/500",
    category: "슈즈",
    description:
      "클래식한 첼시 부츠. 어떤 스타일에도 매치하기 쉬운 베이직 아이템.",
    rating: 4.4,
    reviewCount: 145,
  },
  {
    id: "7",
    name: "울 블렌드 머플러",
    price: 69000,
    image: "https://picsum.photos/seed/woolscarf/400/500",
    category: "액세서리",
    description: "부드러운 울 블렌드 머플러. 따뜻하면서도 세련된 디자인.",
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "8",
    name: "스트레이트 핏 데님 진",
    price: 119000,
    image: "https://picsum.photos/seed/straightjeans/400/500",
    category: "하의",
    description:
      "클래식한 스트레이트 핏 데님. 어떤 상의와도 잘 어울리는 만능 아이템.",
    rating: 4.5,
    reviewCount: 198,
  },
  {
    id: "9",
    name: "오버핏 후드 집업",
    price: 109000,
    image: "https://picsum.photos/seed/hoodie/400/500",
    category: "아우터",
    description:
      "편안한 오버핏 후드 집업. 캐주얼한 데일리 룩에 필수 아이템.",
    rating: 4.2,
    reviewCount: 176,
  },
  {
    id: "10",
    name: "실크 블라우스",
    price: 179000,
    originalPrice: 229000,
    image: "https://picsum.photos/seed/silkblouse/400/500",
    category: "상의",
    description:
      "고급스러운 실크 소재 블라우스. 오피스 룩부터 데이트 룩까지.",
    rating: 4.7,
    reviewCount: 221,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
