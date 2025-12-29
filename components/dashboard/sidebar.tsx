"use client"

import * as React from "react"
import {
    Activity, Calendar, MessageSquare, Pill, Camera,
    Home, Sparkles, LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/app/actions/auth"

interface SidebarProps {
    activeTab: string
    setActiveTab: (tab: string) => void
    isDarkMode: boolean
    toggleDarkMode: () => void
}

const NavItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-4 px-4 py-4 rounded-[1.25rem] transition-all duration-200",
            active
                ? "bg-blue-600 text-white shadow-xl"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:text-slate-400"
        )}
    >
        <Icon size={20} />
        <span className="text-sm font-black tracking-tight">{label}</span>
        {badge && (
            <span className="ml-auto text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                {badge}
            </span>
        )}
    </button>
)

export function DashboardSidebar({ activeTab, setActiveTab, isDarkMode, toggleDarkMode }: SidebarProps) {
    return (
        <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors h-screen sticky top-0">
            <div className="p-6">
                <div className="flex items-center gap-3 text-blue-600">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow-sm">
                        <Activity size={24} />
                    </div>
                    <span className="font-bold text-xl dark:text-white tracking-tight">HealStream</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                <NavItem icon={Home} label="Ringkasan" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <NavItem icon={Camera} label="Galeri Luka" active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
            </nav>

            <div className="p-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-all"
                >
                    {isDarkMode ? <Sparkles size={18} /> : <Activity size={18} />}
                    <span className="text-sm font-bold">{isDarkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
                </button>
                <button
                    onClick={async () => {
                        if (confirm("Keluar dari sistem?")) {
                            await logoutAction()
                        }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                >
                    <LogOut size={20} />
                    <span className="text-sm font-bold">Keluar</span>
                </button>
            </div>
        </aside>
    )
}
