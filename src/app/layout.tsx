import type { Metadata } from "next";
import Script from "next/script";
import { AmplitudeProvider } from "@/lib/analytics/provider";
import { CartProvider } from "@/lib/cart-store";
import { WishlistProvider } from "@/lib/wishlist-store";
import { ToastProvider } from "@/components/toast-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { GuidedHighlightListener } from "@/components/guided-highlight-listener";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyleShop",
  description: "Trendy fashion e-commerce store StyleShop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KGJZWN77');`,
          }}
        />
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KGJZWN77"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AmplitudeProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Header />

                <GuidedHighlightListener />
                <main>{children}</main>
                <Footer />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AmplitudeProvider>
      </body>
    </html>
  );
}
