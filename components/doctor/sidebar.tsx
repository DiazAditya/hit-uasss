"use client"

import * as React from "react"
import {
    Activity, Users, ClipboardList, Calendar, MessageSquare,
    Settings, LogOut, Sun, Moon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/app/actions/auth"

interface SidebarProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

const NavItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
            active
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        )}
    >
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
        {badge && (
            <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                {badge}
            </span>
        )}
    </button>
)

export function DoctorSidebar({ activeTab, setActiveTab }: SidebarProps) {
    return (
        <aside className="w-64 flex-col bg-[#0f172a] text-white border-r border-slate-800 hidden md:flex h-screen sticky top-0">
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-2 text-blue-500">
                    <Activity className="h-6 w-6" />
                    <span className="font-bold text-lg text-white">HealStream <span className="text-xs text-slate-500 font-normal">MD</span></span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                <div className="px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical</div>
                <NavItem icon={Users} label="Patient Triage" active={activeTab === 'triage'} onClick={() => setActiveTab('triage')} />
            </div>

            <div className="p-4 border-t border-slate-800 space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors text-sm">
                    <Settings size={18} /> Settings
                </button>
                <button
                    onClick={async () => {
                        if (confirm("Logout from Provider Portal?")) {
                            await logoutAction()
                        }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </aside>
    )
}
