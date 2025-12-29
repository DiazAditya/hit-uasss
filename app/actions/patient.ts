"use server"

import { cookies } from "next/headers"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function uploadWoundPhotoAction(formData: FormData) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("healstream_user_id")?.value

    if (!userId) return { error: "Unauthorized" }

    const image = formData.get("image") as string
    // In a real app, we would upload this file to storage (S3/Supabase)
    // For now, we assume 'image' is a base64 string passed from client

    if (!image) return { error: "No image provided" }

    try {
        // Get Patient ID associated with this User
        const patient = await prisma.patient.findFirst({
            where: { id: userId } // Assuming user.id == patient.id as per schema relation
        })

        if (!patient) return { error: "Patient profile not found" }

        await prisma.woundEntry.create({
            data: {
                patientId: patient.id,
                imageUrl: image,
                aiAnalysis: "Analisis belum tersedia." // Placeholder
            }
        })

        revalidatePath("/dashboard")
        revalidatePath("/doctor/dashboard") // Revalidate doctor view too
        return { success: true }
    } catch (e) {
        console.error("Upload Error:", e)
        return { error: "Gagal mengupload foto." }
    }
}

export async function getWoundPhotosAction() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("healstream_user_id")?.value

    if (!userId) return []

    try {
        const photos = await prisma.woundEntry.findMany({
            where: { patientId: userId },
            orderBy: { recordedAt: 'desc' }
        })
        return photos
    } catch (e) {
        return []
    }
}
