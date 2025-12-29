"use client"

import * as React from "react"
import { Plus } from "lucide-react"

interface CheckInModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => void
    formInput: any
    setFormInput: (data: any) => void
    isAnalyzing?: boolean
}

export function CheckInModal({ isOpen, onClose, onSubmit, formInput, setFormInput, isAnalyzing }: CheckInModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] p-10 shadow-2xl border border-white/10 transform transition-all animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Check-in Pagi</h2>
                        <p className="text-slate-500 font-medium">Input data kesehatan terbaru Anda.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Plus className="rotate-45" size={32} />
                    </button>
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Detak Jantung (BPM)</label>
                            <input
                                type="number"
                                className="w-full p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 outline-none text-slate-900 dark:text-white font-black text-xl transition-all"
                                value={formInput.hr}
                                onChange={(e) => setFormInput({ ...formInput, hr: e.target.value })}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Suhu Tubuh (°C)</label>
                            <input
                                type="number"
                                step="0.1"
                                className="w-full p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 outline-none text-slate-900 dark:text-white font-black text-xl transition-all"
                                value={formInput.temp}
                                onChange={(e) => setFormInput({ ...formInput, temp: e.target.value })}
                                placeholder="0.0"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">
                            Skala Nyeri: <span className="text-blue-500 text-2xl ml-1">{formInput.pain}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                            value={formInput.pain}
                            onChange={(e) => setFormInput({ ...formInput, pain: parseInt(e.target.value) })}
                        />
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                            <span>Ringan</span>
                            <span>Sedang</span>
                            <span>Berat</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-12">
                    <button
                        onClick={onClose}
                        className="flex-1 py-5 rounded-2xl font-black text-slate-400 uppercase text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={isAnalyzing}
                        className="flex-[2] py-5 rounded-2xl font-black bg-blue-600 text-white shadow-2xl hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all uppercase text-xs flex items-center justify-center gap-2"
                    >
                        {isAnalyzing ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </div>
        </div>
    )
}
