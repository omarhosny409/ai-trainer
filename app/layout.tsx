import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "مدربك الشخصي بالذكاء الاصطناعي | AI Fitness Trainer",
  description: "خطط تمرين وتغذية ومتابعة نتائج ومدرب ذكي متاح 24/7.",
  openGraph: { title: "AI Fitness Trainer", description: "مدرب كمال أجسام وتغذية بالذكاء الاصطناعي", type: "website" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl" suppressHydrationWarning>
        <body className={`${cairo.variable} font-sans bg-radial min-h-screen`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
