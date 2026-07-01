import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white/80 px-4 py-3 backdrop-blur dark:bg-slate-950/80 sm:px-6">
      <div className="relative mx-auto flex max-w-3xl items-center justify-between gap-4">
        <Link
          href="/"
          className="block text-slate-950 transition-colors dark:text-white"
          aria-label="Запретные знания"
        >
          <span className="site-logo block h-8 w-40 bg-current sm:h-9 sm:w-48" aria-hidden="true" />
          <span className="sr-only">Запретные знания</span>
        </Link>
        <MainNav />
        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
