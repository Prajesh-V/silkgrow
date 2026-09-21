import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SilkGrow — Smart Sericulture",
  description:
    "SilkGrow helps sericulture farmers monitor cocoon and silk prices, understand market trends, view AI-assisted price forecasts, and book essential sericulture resources.",
  keywords: [
    "sericulture",
    "cocoon",
    "silk",
    "price forecast",
    "agriculture",
    "farming",
    "market intelligence",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('silkgrow:theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-text-main antialiased">
        {children}
      </body>
    </html>
  );
}

