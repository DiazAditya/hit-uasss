"use client"

import React, { useState } from 'react'
import { Plus } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor/sidebar"
import { PatientList, Patient } from "@/components/doctor/patient-list"
import { PatientDetail } from "@/components/doctor/patient-detail"
import { AddPatientModal } from "@/components/doctor/add-patient-modal"

interface DoctorDashboardClientProps {
    initialPatients: Patient[]
}

export function DoctorDashboardClient({ initialPatients }: DoctorDashboardClientProps) {
    const [activeTab, setActiveTab] = useState('triage')
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(initialPatients.length > 0 ? initialPatients[0].id : null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    // In a real app with strict RSC, we might want to refresh this list via router.refresh() 
    // or pass it as prop updates. For simplicity now, we assume initialPatients updates on revalidate.
    const selectedPatient = initialPatients.find(p => p.id === selectedPatientId)

    return (
        <div className="flex min-h-screen bg-[#0b1121] text-slate-300 font-sans selection:bg-blue-500/30">
            <DoctorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 flex overflow-hidden">
                {/* Left Panel: Patient List */}
                <div className="w-80 border-r border-slate-800 flex flex-col bg-[#0b1121]">
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-white text-lg">Pasien</h2>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all shadow-lg shadow-blue-900/20"
                                title="Tambah Pasien"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Cari pasien..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-600 outline-none placeholder:text-slate-600 transition-all"
                        />
                    </div>

                    {initialPatients.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center opacity-60">
                            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-600">
                                <Plus size={32} />
                            </div>
                            <p className="text-sm font-medium text-slate-400 mb-4">Belum ada pasien.</p>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="px-4 py-2 bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                            >
                                Tambah Pasien
                            </button>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto px-4 pb-4">
                            <PatientList
                                patients={initialPatients}
                                selectedId={selectedPatientId}
                                onSelect={setSelectedPatientId}
                            />
                        </div>
                    )}
                </div>

                {/* Right Panel: Detail or Empty State */}
                <div className="flex-1 p-6 overflow-y-auto bg-[#0f172a]">
                    {selectedPatient ? (
                        <PatientDetail patient={selectedPatient} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-600 flex-col gap-4">
                            <p>Pilih pasien untuk melihat detail detail</p>
                        </div>
                    )}
                </div>
            </main>

            <AddPatientModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    )
}
