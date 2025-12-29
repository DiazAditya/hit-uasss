"use client"

import { Activity, Calendar, Clock, FileText, ChevronRight, TrendingUp, TrendingDown, Trash2, Phone, CheckSquare, Zap, Thermometer } from "lucide-react"
import type { Patient } from "./patient-list"
import { WoundGallery } from "./wound-gallery"

interface PatientDetailProps {
    patient: Patient
}

export function PatientDetail({ patient }: PatientDetailProps) {
    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-start bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div>
                    <h2 className="text-2xl font-black text-white">{patient.name}</h2>
                    <div className="flex gap-3 mt-1 text-sm text-slate-400">
                        <span>ID: #{patient.id}</span>
                        <span>•</span>
                        <span>{patient.opType}</span>

                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={async () => {
                            if (confirm("Apakah Anda yakin ingin menghapus pasien ini dari daftar Anda?")) {
                                await import("@/app/actions/doctor").then(m => m.removePatientAction(patient.id))
                                // Optional: trigger refresh
                            }
                        }}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                    >
                        <Trash2 size={16} /> <span className="hidden md:inline">Hapus Pasien</span>
                    </button>
                </div>
            </div>

            {/* Vitals Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Heart Rate</p>
                        <p className="text-3xl font-black text-white">{patient.lastVitals.bpm} <span className="text-sm font-medium text-slate-500">bpm</span></p>
                    </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                        <Thermometer size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Temperature</p>
                        <p className="text-3xl font-black text-white">{patient.lastVitals.temp}°C</p>
                    </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                        <Zap size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Pain Level</p>
                        <p className="text-3xl font-black text-white">{patient.lastVitals.pain}<span className="text-lg text-slate-500">/10</span></p>
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="flex-1 min-h-0 min-w-0">
                {/* Wound Gallery */}
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 h-full">
                    <WoundGallery photos={patient.woundEntries} />
                </div>
            </div>
        </div>
    )
}
