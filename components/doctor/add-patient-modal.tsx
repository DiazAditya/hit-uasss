"use client"

import * as React from "react"
import { Loader2, UserPlus, X, Search } from "lucide-react"
import { searchPatientsAction, assignPatientAction } from "@/app/actions/doctor"

interface AddPatientModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AddPatientModal({ isOpen, onClose }: AddPatientModalProps) {
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<{ id: string; name: string; email: string }[]>([])
    const [isSearching, setIsSearching] = React.useState(false)
    const [isAdding, setIsAdding] = React.useState(false)

    if (!isOpen) return null

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSearching(true)
        const res = await searchPatientsAction(query)
        setResults(res)
        setIsSearching(false)
    }

    const handleAdd = async (patientId: string) => {
        setIsAdding(true)
        const res = await assignPatientAction(patientId)
        setIsAdding(false)
        if (res.success) {
            onClose()
            setQuery("")
            setResults([])
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 relative shadow-2xl animate-in zoom-in-95">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Cari Pasien</h2>
                    <p className="text-slate-400 text-sm mt-1">Cari dan tambahkan pasien yang sudah terdaftar.</p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Nama pasien..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={isSearching || !query}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-xl font-bold transition-colors disabled:opacity-50"
                    >
                        {isSearching ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                    </button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {results.length > 0 ? (
                        results.map(patient => (
                            <div key={patient.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
                                <div>
                                    <p className="text-white font-bold text-sm">{patient.name}</p>
                                    <p className="text-slate-500 text-xs">{patient.email}</p>
                                </div>
                                <button
                                    onClick={() => handleAdd(patient.id)}
                                    disabled={isAdding}
                                    className="p-2 bg-blue-600/20 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                                >
                                    {isAdding ? <Loader2 className="animate-spin" size={16} /> : <UserPlus size={16} />}
                                </button>
                            </div>
                        ))
                    ) : (
                        query && !isSearching && <p className="text-center text-slate-500 text-sm py-4">Pasien tidak ditemukan atau sudah memiliki dokter.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
