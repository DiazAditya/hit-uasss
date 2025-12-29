import { getDoctorPatients } from "@/app/actions/doctor"
import { DoctorDashboardClient } from "@/components/doctor/doctor-dashboard-client"

export default async function DoctorDashboardPage() {
    // Fetch real patients from DB
    const patients: any[] = await getDoctorPatients()

    return <DoctorDashboardClient initialPatients={patients} />
}
