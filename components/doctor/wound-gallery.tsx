"use client"

import Image from "next/image"
import { Calendar } from "lucide-react"

interface WoundGalleryProps {
    photos: {
        id: string
        imageUrl: string
        recordedAt: Date
    }[]
}

export function WoundGallery({ photos }: WoundGalleryProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-200">Wound Recovery Progression</h4>
                <button className="text-xs text-blue-400 hover:underline">View All Photos</button>
            </div>

            {photos && photos.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {photos.map((img, i) => (
                        <div key={i} className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-video">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.imageUrl}
                                alt="Wound"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-bold flex items-center gap-1">
                                <Calendar size={10} />
                                {new Date(img.recordedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center p-8 bg-slate-900/50 rounded-xl border border-dashed border-slate-700 text-slate-500 text-sm">
                    No wound photos available.
                </div>
            )}
        </div>
    )
}
