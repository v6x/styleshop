import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script
          src="https://cdn.amplitude.com/script/11ac0aba94f06500e63bb124d05f2346.js"
          strategy="beforeInteractive"
        />
        <Script
          id="amplitude-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));window.amplitude.init('11ac0aba94f06500e63bb124d05f2346', {"fetchRemoteConfig":true,"autocapture":{"attribution":true,"fileDownloads":true,"formInteractions":true,"pageViews":true,"sessions":true,"elementInteractions":true,"networkTracking":true,"webVitals":true,"frustrationInteractions":{"thrashedCursor":true,"errorClicks":true,"deadClicks":true,"rageClicks":true}}});`,
          }}
        />
      </head>
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
