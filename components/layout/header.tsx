import Link from "next/link"
import { Activity, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <HeartPulse className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl text-primary">HealStream</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link
                        href="/dashboard"
                        className="hidden text-foreground/60 transition-colors hover:text-foreground md:block" // Hidden on mobile for now, maybe accessible via menu
                    >
                        Dashboard
                    </Link>
                    <Button size="sm" asChild>
                        <Link href="/dashboard">Monitor Health</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}
