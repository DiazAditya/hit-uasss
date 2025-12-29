import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Create Doctors
    const doctorUser = await prisma.user.upsert({
        where: { email: 'dr.strange@healstream.md' },
        update: {},
        create: {
            email: 'dr.strange@healstream.md',
            fullName: 'Dr. Stephen Strange',
            role: 'doctor',
            doctorProfile: {
                create: {
                    specialization: 'Neurosurgeon',
                    hospitalId: 'HOSP-NY-001',
                },
            },
        },
    })

    // Create Patient
    const patientUser = await prisma.user.upsert({
        where: { email: 'alex@example.com' },
        update: {},
        create: {
            email: 'alex@example.com',
            fullName: 'Alex Thompson',
            role: 'patient',
            patientProfile: {
                create: {
                    dateOfBirth: new Date('1980-01-01'),
                    operationType: 'Cardiac Bypass',
                    operationDate: new Date('2025-12-20'),
                    riskScore: 85,
                    status: 'critical',
                    doctorId: doctorUser.id,
                    vitalLogs: {
                        create: [
                            { heartRate: 110, temperature: 38.2, painLevel: 8 },
                            { heartRate: 108, temperature: 38.0, painLevel: 7 },
                        ]
                    }
                },
            },
        },
    })

    console.log({ doctorUser, patientUser })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
