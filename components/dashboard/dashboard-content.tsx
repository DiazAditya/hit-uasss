"use client"

import React, { useState, useEffect } from 'react'
import {
    Heart, Thermometer, Activity, Droplets,
    ArrowRight, Sparkles, Loader2, AlertCircle
} from 'lucide-react'
import {
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts'
import { analyzeVitals } from "@/app/actions"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { CheckInModal } from "@/components/dashboard/check-in-modal"
import { DashboardHeader } from "@/components/dashboard/header"

import { WoundGalleryView } from "@/components/dashboard/wound-gallery-view"

// Types
type VitalsData = {
    heartRate: number
    temperature: number
    painLevel: number
    spo2: number
    lastUpdate: string
}

type ChartDataPoint = {
    time: string
    heartRate: number
    temp: number
    pain: number
}

interface DashboardClientProps {
    initialVitals: VitalsData
    initialChartData: ChartDataPoint[]
    initialWoundPhotos: any[]
}

export function DashboardClient({ initialVitals, initialChartData, initialWoundPhotos }: DashboardClientProps) {
    const [activeTab, setActiveTab] = useState('overview')
    const [showCheckIn, setShowCheckIn] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(true)

    // State untuk AI
    const [aiInsight, setAiInsight] = useState("Menunggu input harian Anda untuk melakukan analisis...")
    const [isAiLoading, setIsAiLoading] = useState(false)

    // Manajemen State Data
    const [chartData, setChartData] = useState<ChartDataPoint[]>(initialChartData)
    const [currentVitals, setCurrentVitals] = useState<VitalsData>(initialVitals)

    // Initialize state from props if mounting for the first time
    useEffect(() => {
        if (initialVitals) setCurrentVitals(initialVitals)
        if (initialChartData) setChartData(initialChartData)
    }, [initialVitals, initialChartData])

    const [formInput, setFormInput] = useState({ hr: '', temp: '', pain: 3 })

    // --- INTEGRASI LLM (AI ANALYSIS) ---
    const generateAiInsight = async (vitals: typeof currentVitals) => {
        setIsAiLoading(true)

        try {
            const result = await analyzeVitals({
                bpm: vitals.heartRate.toString(),
                temp: vitals.temperature.toString(),
                pain: vitals.painLevel.toString()
            })

            if (result && result.analysis) {
                setAiInsight(result.analysis)
            } else {
                setAiInsight("Analisis selesai, namun tidak ada respons teks.")
            }
        } catch (error) {
            console.error("AI Error:", error)
            setAiInsight("Maaf, terjadi kesalahan saat menghubungkan ke AI.")
        } finally {
            setIsAiLoading(false)
        }
    }

    const handleCheckInSubmit = () => {
        if (!formInput.hr || !formInput.temp) return

        const now = new Date()
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

        const newVitals = {
            heartRate: parseInt(formInput.hr),
            temperature: parseFloat(formInput.temp),
            painLevel: typeof formInput.pain === 'number' ? formInput.pain : parseInt(formInput.pain),
            spo2: 98,
            lastUpdate: timeStr
        }

        // Update Vitals dan Chart
        setCurrentVitals(newVitals)
        setChartData(prev => [...prev, {
            time: timeStr,
            heartRate: newVitals.heartRate,
            temp: newVitals.temperature,
            pain: newVitals.painLevel
        }].slice(-6))

        // Pemicu Analisis AI
        // generateAiInsight(newVitals)

        // Tutup Modal & Reset
        setShowCheckIn(false)
        setFormInput({ hr: '', temp: '', pain: 3 })
    }

    const vitalsConfig = [
        { label: 'Detak Jantung', value: currentVitals.heartRate, unit: 'bpm', icon: Heart, color: 'text-rose-500', trend: `Update: ${currentVitals.lastUpdate}` },
        { label: 'Suhu Tubuh', value: currentVitals.temperature, unit: '°C', icon: Thermometer, color: 'text-orange-500', trend: `Update: ${currentVitals.lastUpdate}` },
        { label: 'Tingkat Nyeri', value: currentVitals.painLevel, unit: '/10', icon: Activity, color: 'text-purple-500', trend: 'Manual' },
        { label: 'Saturasi Oksigen', value: currentVitals.spo2, unit: '%', icon: Droplets, color: 'text-sky-500', trend: 'Stabil' },
    ]

    return (
        <div className={`flex min-h-screen w-full ${isDarkMode ? 'dark' : ''} font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-950`}>

            {/* Sidebar Navigation */}
            <DashboardSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isDarkMode={isDarkMode}
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <DashboardHeader lastUpdate={currentVitals.lastUpdate} />

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
                    {activeTab === 'gallery' ? (
                        <WoundGalleryView initialPhotos={initialWoundPhotos} />
                    ) : (
                        <div className="max-w-7xl mx-auto space-y-8">

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Banner Welcome */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-3">
                                            <h2 className="text-3xl font-black tracking-tight">Halo! 👋</h2>
                                            <p className="text-blue-100 text-lg font-medium max-w-md">Lengkapi data kesehatan harian Anda sekarang untuk pemulihan yang lebih baik.</p>
                                        </div>
                                        <button
                                            onClick={() => setShowCheckIn(true)}
                                            className="bg-white text-blue-600 px-8 py-5 rounded-2xl font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                                        >
                                            Mulai Check-in <ArrowRight size={20} />
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>
                                </div>


                            </div>

                            {/* Grid Vitalitas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {vitalsConfig.map((v, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/30 hover:shadow-lg dark:hover:shadow-blue-900/10 transition-all group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-4 rounded-2xl ${v.color.replace('text', 'bg')}/10 ${v.color} group-hover:scale-110 transition-transform`}>
                                                <v.icon size={28} />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">{v.trend}</span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{v.value}</span>
                                            <span className="text-slate-500 text-sm font-black uppercase opacity-60">{v.unit}</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">{v.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Grafik Tren Pemulihan */}
                            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Grafik Pemulihan</h3>
                                        <p className="text-sm text-slate-500 font-medium mt-1">Tren detak jantung dalam 6 jam terakhir</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold text-xs uppercase tracking-wide">Heart Rate</span>
                                        <span className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold text-xs uppercase tracking-wide hover:bg-slate-100 transition-colors cursor-pointer">Temperature</span>
                                    </div>
                                </div>
                                <div className="h-80 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#e2e8f0"} />
                                            <XAxis
                                                dataKey="time"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                hide
                                                domain={['dataMin - 10', 'dataMax + 10']}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                                                    border: 'none',
                                                    borderRadius: '1.25rem',
                                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                                }}
                                                itemStyle={{ color: isDarkMode ? '#fff' : '#0f172a', fontWeight: 'bold' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="heartRate"
                                                stroke="#3b82f6"
                                                strokeWidth={5}
                                                fillOpacity={1}
                                                fill="url(#colorHr)"
                                                animationDuration={1500}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}
                </div>



                {/* Modal Form Check-in */}
                <CheckInModal
                    isOpen={showCheckIn}
                    onClose={() => setShowCheckIn(false)}
                    onSubmit={handleCheckInSubmit}
                    formInput={formInput}
                    setFormInput={setFormInput}
                    isAnalyzing={isAiLoading}
                />
            </main>
        </div>
    )
}
