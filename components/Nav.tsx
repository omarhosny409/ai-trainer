import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Nav() {
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <Link href="/" className="text-xl font-black text-gold-400">AI Fit Pro</Link>
      <nav className="hidden gap-6 text-sm text-white/70 md:flex">
        <Link href="/#features">المميزات</Link><Link href="/pricing">الأسعار</Link><Link href="/calculator">الحاسبات</Link><Link href="/dashboard">لوحة التحكم</Link>
      </nav>
      <SignedOut><SignInButton><button className="btn-secondary">تسجيل الدخول</button></SignInButton></SignedOut>
      <SignedIn><UserButton afterSignOutUrl="/" /></SignedIn>
    </div>
  </header>;
}
