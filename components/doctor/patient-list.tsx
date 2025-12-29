"use client"

import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export interface Patient {
    id: string
    name: string
    age: number
    opType: string
    opDate: string
    riskScore: number // 0-100
    status: 'critical' | 'observation' | 'stable'
    lastVitals: {
        bpm: number
        temp: number
        pain: number
    }
    history: {
        time: string
        bpm: number
        temp: number
        pain: number
    }[]
    woundEntries: {
        id: string
        imageUrl: string
        recordedAt: Date
        aiAnalysis: string | null
    }[]
}

interface PatientListProps {
    patients: Patient[]
    selectedId: string | null
    onSelect: (id: string) => void
}

export function PatientList({ patients, selectedId, onSelect }: PatientListProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <h3 className="font-bold text-slate-700 dark:text-slate-200">Patient Triage</h3>
                <p className="text-xs text-slate-500">Sorted by Risk Score</p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {patients.map((patient) => (
                    <button
                        key={patient.id}
                        onClick={() => onSelect(patient.id)}
                        className={`w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between ${selectedId === patient.id ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-900 dark:text-slate-100">{patient.name}</span>
                                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{patient.age}y</span>
                            </div>
                            <div className="text-xs text-slate-500">{patient.opType} • {patient.opDate}</div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                            {patient.status === 'critical' && (
                                <span className="flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                                    <AlertTriangle size={12} /> Critical
                                </span>
                            )}
                            {patient.status === 'observation' && (
                                <span className="flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                                    <Clock size={12} /> Observation
                                </span>
                            )}
                            {patient.status === 'stable' && (
                                <span className="flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                    <CheckCircle size={12} /> Stable
                                </span>
                            )}

                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
