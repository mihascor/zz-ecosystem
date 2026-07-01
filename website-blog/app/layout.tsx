import Link from "next/link"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata = {
  title: "Запретные знания",
  description: "Простой блог о скрытых смыслах, истории и символах.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8 sm:px-6">
            <header className="mb-10">
              <div className="flex items-center justify-between gap-4">
                <Link href="/" className="text-base font-semibold">
                  Запретные знания
                </Link>
                <ModeToggle />
                <nav className="ml-auto flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-200 sm:gap-6">
                  <Link href="/">Главная</Link>
                  <Link href="/blog">Блог</Link>
                  <Link href="/tags">Теги</Link>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
