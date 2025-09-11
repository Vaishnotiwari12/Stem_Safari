"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, BarChart3, Users, Heart, UserPlus, GraduationCap, Menu, Gamepad2 } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/teacher",
      label: "Teacher Dashboard",
      icon: BarChart3,
    },
    {
      href: "/teacher/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      href: "/games",
      label: "Games (6–12)",
      icon: Gamepad2,
    },
    {
      href: "/community",
      label: "Community",
      icon: Users,
    },
    {
      href: "/parent",
      label: "Parent Hub",
      icon: Heart,
    },
    {
      href: "/signup/student",
      label: "Student Signup",
      icon: GraduationCap,
    },
    {
      href: "/signup/teacher",
      label: "Teacher Signup",
      icon: UserPlus,
    },
  ]

  return (
    <>
      <nav className="hidden md:flex items-center gap-2">
        {navItems.slice(0, 6).map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Button key={item.href} asChild variant={isActive ? "default" : "ghost"} size="sm">
              <Link href={item.href} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </nav>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col gap-4 mt-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
