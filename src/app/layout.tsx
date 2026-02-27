import type { Metadata } from "next";
import { AmplitudeProvider } from "@/lib/analytics/provider";
import { CartProvider } from "@/lib/cart-store";
import { Header } from "@/components/header";
import { PageTracker } from "@/components/page-tracker";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyleShop",
  description: "트렌디한 패션 쇼핑몰 StyleShop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AmplitudeProvider>
          <CartProvider>
            <Header />
            <PageTracker />
            <main>{children}</main>
          </CartProvider>
        </AmplitudeProvider>
      </body>
    </html>
  );
}
