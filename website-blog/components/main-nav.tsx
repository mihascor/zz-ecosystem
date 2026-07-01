"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/blog", label: "Блог" },
  { href: "/tags", label: "Теги" },
]

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MainNav() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="relative ml-auto text-sm font-medium">
      <button
        type="button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white md:hidden"
      >
        <span className="flex w-4 flex-col gap-1">
          <span
            className={
              isOpen
                ? "h-0.5 w-4 translate-y-1.5 rotate-45 bg-current transition"
                : "h-0.5 w-4 bg-current transition"
            }
          />
          <span
            className={
              isOpen
                ? "h-0.5 w-4 opacity-0 transition"
                : "h-0.5 w-4 bg-current transition"
            }
          />
          <span
            className={
              isOpen
                ? "h-0.5 w-4 -translate-y-1.5 -rotate-45 bg-current transition"
                : "h-0.5 w-4 bg-current transition"
            }
          />
        </span>
      </button>

      <nav className="hidden items-center gap-2 md:flex md:gap-3">
        {navItems.map((item) => {
          const isActive = isActivePath(pathname, item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "rounded px-2 py-1 text-slate-950 underline decoration-slate-950 underline-offset-4 dark:text-white dark:decoration-white"
                  : "rounded px-2 py-1 text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              }
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {isOpen && (
        <nav className="absolute right-0 top-11 z-50 w-44 rounded border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-950 md:hidden">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "block rounded bg-slate-100 px-3 py-2 text-slate-950 dark:bg-slate-800 dark:text-white"
                    : "block rounded px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </div>
  )
}
