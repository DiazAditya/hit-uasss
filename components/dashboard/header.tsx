"use client"

import * as React from "react"

export function DashboardHeader({ lastUpdate }: { lastUpdate: string }) {
    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10 transition-colors">
            <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Dashboard Pasien</h1>
                <p className="text-xs text-slate-500 font-medium">Pemulihan Hari ke-5 • Terakhir Update {lastUpdate}</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-2 py-1 rounded-full">Sistem Aktif</span>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                    AM
                </div>
            </div>
        </header>
    )
}
