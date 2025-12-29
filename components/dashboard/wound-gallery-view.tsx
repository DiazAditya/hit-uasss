"use client"

import React, { useState } from 'react'
import { Camera, Calendar, Upload, Loader2, Plus, Image as ImageIcon, Sparkles } from 'lucide-react'
import { uploadWoundPhotoAction } from '@/app/actions/patient'

interface WoundEntry {
    id: string
    imageUrl: string
    recordedAt: Date | string
    aiAnalysis: string | null
}

interface WoundGalleryViewProps {
    initialPhotos: WoundEntry[]
}

export function WoundGalleryView({ initialPhotos }: WoundGalleryViewProps) {
    const [photos, setPhotos] = useState<WoundEntry[]>(initialPhotos)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState("")

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setUploadError("")

        try {
            // Convert to Base64
            const reader = new FileReader()
            reader.onloadend = async () => {
                const base64String = reader.result as string

                // Create FormData
                const formData = new FormData()
                formData.append("image", base64String)

                const result = await uploadWoundPhotoAction(formData)

                if (result.error) {
                    setUploadError(result.error)
                } else {
                    // Update local state optimistically or just refresh
                    // For now, simple optimistic update
                    const newPhoto: WoundEntry = {
                        id: Math.random().toString(), // Temp ID
                        imageUrl: base64String,
                        recordedAt: new Date(),
                        aiAnalysis: "Sedang diproses..."
                    }
                    setPhotos([newPhoto, ...photos])
                }
                setIsUploading(false)
            }
            reader.readAsDataURL(file)
        } catch (error) {
            console.error("File processing error:", error)
            setUploadError("Gagal memproses gambar.")
            setIsUploading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Galeri Luka</h2>
                    <p className="text-slate-500 mt-1">Pantau perkembangan pemulihan luka Anda.</p>
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        id="wound-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                    />
                    <label
                        htmlFor="wound-upload"
                        className={`cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                        <span>Tambah Foto</span>
                    </label>
                </div>
            </div>

            {uploadError && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-xl font-medium border border-red-200 dark:border-red-800">
                    {uploadError}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
                        <Camera size={48} className="mb-4 opacity-50" />
                        <p className="font-bold">Belum ada foto luka.</p>
                        <p className="text-sm">Klik tombol "Tambah Foto" untuk mulai memantau.</p>
                    </div>
                ) : (
                    photos.map((photo, i) => (
                        <div key={photo.id || i} className="group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all">
                            <div className="aspect-video relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={photo.imageUrl}
                                    alt="Wound"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5">
                                    <Calendar size={12} />
                                    {new Date(photo.recordedAt).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                    <Sparkles size={16} className="text-blue-500" />
                                    Analisis AI
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                                    {photo.aiAnalysis || "Menunggu proses analisis..."}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
