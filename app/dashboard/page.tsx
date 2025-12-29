import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { DashboardClient } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const session = cookieStore.get("healstream_session")
    const userId = cookieStore.get("healstream_user_id")

    // Protected Route
    if (!session || session.value !== 'patient' || !userId) {
        redirect("/login")
    }

    // Default values if no data
    let initialVitals = {
        heartRate: 72,
        temperature: 36.5,
        painLevel: 0,
        spo2: 98,
        lastUpdate: '--:--'
    }

    let initialChartData = [
        { time: '08:00', heartRate: 72, temp: 36.5, pain: 0 },
        { time: '12:00', heartRate: 75, temp: 36.6, pain: 0 },
    ]

    try {
        // Fetch Patient's vital logs
        const logs = await prisma.vitalLog.findMany({
            where: { patientId: userId.value },
            orderBy: { recordedAt: 'desc' },
            take: 6
        })

        if (logs.length > 0) {
            const latest = logs[0]
            const timeStr = new Date(latest.recordedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

            initialVitals = {
                heartRate: latest.heartRate,
                temperature: latest.temperature,
                painLevel: latest.painLevel,
                spo2: latest.spo2 || 98,
                lastUpdate: timeStr
            }

            // Prepare Chart Data (Reverse to show chronological order)
            initialChartData = logs.reverse().map(log => ({
                time: new Date(log.recordedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                heartRate: log.heartRate,
                temp: log.temperature,
                pain: log.painLevel
            }))
        }
    } catch (e) {
        console.error("Failed to fetch dashboard data:", e)
    }

    // Fetch Wound Photos
    let initialWoundPhotos: any[] = []
    try {
        initialWoundPhotos = await prisma.woundEntry.findMany({
            where: { patientId: userId.value },
            orderBy: { recordedAt: 'desc' },
        })
    } catch (e) {
        console.error("Failed to fetch wound photos:", e)
    }

    return (
        <DashboardClient
            initialVitals={initialVitals}
            initialChartData={initialChartData}
            initialWoundPhotos={initialWoundPhotos}
        />
    )
}
