"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

// --- SEARCH & LINK PATIENT ---

export async function searchPatientsAction(query: string) {
    if (!query || query.length < 2) return []

    try {
        const patients = await prisma.patient.findMany({
            where: {
                user: {
                    fullName: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                // doctorId: null // Allow searching all patients
            },
            include: { user: true },
            take: 5
        })

        return patients.map((p: any) => ({
            id: p.id,
            name: p.user.fullName,
            email: p.user.email
        }))
    } catch (e) {
        console.error("Search Patient Error:", e)
        return []
    }
}

export async function assignPatientAction(patientId: string) {
    const cookieStore = await cookies()
    const doctorId = cookieStore.get("healstream_user_id")?.value

    if (!doctorId) return { error: "Unauthorized" }

    try {
        await prisma.patient.update({
            where: { id: patientId },
            data: { doctorId: doctorId }
        })

        revalidatePath("/doctor/dashboard")
        return { success: true }
    } catch (e) {
        console.error("Assign Patient Error:", e)
        return { error: "Gagal menambahkan pasien." }
    }
}

// --- REMOVE PATIENT ---

export async function removePatientAction(patientId: string) {
    const cookieStore = await cookies()
    const doctorId = cookieStore.get("healstream_user_id")?.value

    if (!doctorId) return { error: "Unauthorized" }

    try {
        // Verify ownership first for security
        const patient = await prisma.patient.findFirst({
            where: { id: patientId, doctorId: doctorId }
        })

        if (!patient) return { error: "Pasien tidak ditemukan atau bukan pasien Anda." }

        await prisma.patient.update({
            where: { id: patientId },
            data: { doctorId: null }
        })

        revalidatePath("/doctor/dashboard")
        return { success: true }
    } catch (e) {
        console.error("Remove Patient Error:", e)
        return { error: "Gagal menghapus pasien." }
    }
}

// --- GET DOCTOR'S PATIENTS ---

export async function getDoctorPatients() {
    const cookieStore = await cookies()
    const doctorId = cookieStore.get("healstream_user_id")?.value

    if (!doctorId) return []

    try {
        const patients = await prisma.patient.findMany({
            where: { doctorId },
            include: {
                user: true,
                vitalLogs: {
                    orderBy: { recordedAt: 'desc' },
                    take: 7
                },
                woundEntries: {
                    orderBy: { recordedAt: 'desc' },
                    take: 6
                }
            },
            orderBy: { riskScore: 'desc' }
        })

        return patients.map((p: any) => ({
            id: p.id,
            name: p.user.fullName,
            age: new Date().getFullYear() - p.dateOfBirth.getFullYear(), // Approx
            opType: p.operationType,
            opDate: p.operationDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            riskScore: p.riskScore,
            status: p.status,
            lastVitals: p.vitalLogs[0] ? {
                bpm: p.vitalLogs[0].heartRate,
                temp: p.vitalLogs[0].temperature,
                pain: p.vitalLogs[0].painLevel
            } : { bpm: 0, temp: 0, pain: 0 },
            history: p.vitalLogs.reverse().map((log: any) => ({
                time: log.recordedAt.toLocaleDateString('id-ID', { weekday: 'short' }), // Simplified for chart
                bpm: log.heartRate,
                temp: log.temperature,
                pain: log.painLevel
            })),
            woundEntries: p.woundEntries
        }))
    } catch (e) {
        console.error("Get Patients Error:", e)
        return []
    }
}
