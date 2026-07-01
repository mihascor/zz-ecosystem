import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { SiteHeader } from "@/components/site-header"

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
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-8 pt-24 sm:px-6">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
