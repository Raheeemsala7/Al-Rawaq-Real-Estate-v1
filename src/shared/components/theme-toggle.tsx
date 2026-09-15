"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    // Prevents hydration mismatch � only render after client mount
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = theme === "dark"

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative overflow-hidden"
        >
            <Sun
                className="absolute size-4 transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0\"
            />
            <Moon
                className="absolute size-4 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100\"
            />
        </Button>
    )
}
