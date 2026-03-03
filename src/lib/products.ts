import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Oversized Blazer",
    price: 149.0,
    originalPrice: 199.0,
    image: "https://picsum.photos/seed/blazer/400/500",
    category: "Outerwear",
    description:
      "A relaxed oversized blazer that works for both casual and formal occasions. A wardrobe essential.",
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "2",
    name: "Soft Cashmere Knit Sweater",
    price: 98.0,
    image: "https://picsum.photos/seed/cashmere/400/500",
    category: "Tops",
    description: "A soft cashmere blend knit sweater. Warm yet lightweight for everyday comfort.",
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: "3",
    name: "Wide Fit Cotton Pants",
    price: 68.0,
    image: "https://picsum.photos/seed/widepants/400/500",
    category: "Bottoms",
    description:
      "Wide-leg cotton pants with a relaxed silhouette. Perfect for comfortable daily outfits.",
    rating: 4.3,
    reviewCount: 89,
  },
  {
    id: "4",
    name: "Linen Blend Shirt Dress",
    price: 128.0,
    originalPrice: 158.0,
    image: "https://picsum.photos/seed/shirtdress/400/500",
    category: "Dresses",
    description:
      "A breezy linen blend shirt dress. Features an adjustable waist belt for a custom fit.",
    rating: 4.6,
    reviewCount: 167,
  },
  {
    id: "5",
    name: "Minimal Leather Tote Bag",
    price: 189.0,
    image: "https://picsum.photos/seed/totebag/400/500",
    category: "Accessories",
    description: "A clean-lined soft leather tote bag with generous storage space.",
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "6",
    name: "Classic Chelsea Boots",
    price: 158.0,
    originalPrice: 198.0,
    image: "https://picsum.photos/seed/chelseaboot/400/500",
    category: "Shoes",
    description:
      "Classic Chelsea boots that pair effortlessly with any outfit. A timeless staple.",
    rating: 4.4,
    reviewCount: 145,
  },
  {
    id: "7",
    name: "Wool Blend Scarf",
    price: 52.0,
    image: "https://picsum.photos/seed/woolscarf/400/500",
    category: "Accessories",
    description: "A soft wool blend scarf. Warm and stylish with a refined design.",
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "8",
    name: "Straight Fit Denim Jeans",
    price: 89.0,
    image: "https://picsum.photos/seed/straightjeans/400/500",
    category: "Bottoms",
    description:
      "Classic straight-fit denim jeans that go with everything. A true everyday essential.",
    rating: 4.5,
    reviewCount: 198,
  },
  {
    id: "9",
    name: "Oversized Zip-Up Hoodie",
    price: 85.0,
    image: "https://picsum.photos/seed/hoodie/400/500",
    category: "Outerwear",
    description:
      "A cozy oversized zip-up hoodie. A must-have for relaxed casual looks.",
    rating: 4.2,
    reviewCount: 176,
  },
  {
    id: "10",
    name: "Silk Blouse",
    price: 139.0,
    originalPrice: 179.0,
    image: "https://picsum.photos/seed/silkblouse/400/500",
    category: "Tops",
    description:
      "A luxurious silk blouse. Versatile enough for the office or a night out.",
    rating: 4.7,
    reviewCount: 221,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
