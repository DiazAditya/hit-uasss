"use client"

import { User, Stethoscope } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoleSwitcherProps {
    role: "patient" | "doctor"
    setRole: (role: "patient" | "doctor") => void
}

export function RoleSwitcher({ role, setRole }: RoleSwitcherProps) {
    return (
        <div className="grid grid-cols-2 p-1 bg-slate-800/50 rounded-xl border border-slate-800">
            <button
                onClick={() => setRole("patient")}
                className={cn(
                    "flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all",
                    role === "patient"
                        ? "bg-slate-700/50 text-white shadow-sm ring-1 ring-white/10"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
            >
                <User size={18} />
                Patient
            </button>
            <button
                onClick={() => setRole("doctor")}
                className={cn(
                    "flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all",
                    role === "doctor"
                        ? "bg-slate-700/50 text-white shadow-sm ring-1 ring-white/10"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
            >
                <Stethoscope size={18} />
                Doctor
            </button>
        </div>
    )
}
