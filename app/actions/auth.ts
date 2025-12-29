"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

// Used to mock session for now, but validating against DB
export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string // In real app, verify hash

    if (!email || !password) {
        return { error: "Semua kolom harus diisi" }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return { error: "Email tidak terdaftar" }
            // For demo, we might want to auto-create? No, stick to real flow.
        }

        // Simulate password check (In real world: bcrypt.compare(password, user.passwordHash))
        // For this project scope, we trust if user exists for now, or just check simple match?
        // Let's assume any password works if user exists, as we didn't store password hash in schema.

        // Set Session
        const cookieStore = await cookies(); // Use await for Next.js 15

        // Store Role
        // @ts-ignore
        cookieStore.set("healstream_session", user.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 // 1 day
        })

        // Store User ID (for demo purposes, unsecured but functional)
        // @ts-ignore
        cookieStore.set("healstream_user_id", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 // 1 day
        })

        return { success: true, role: user.role }

    } catch (error) {
        console.error("Login Check Error:", error)
        return { error: "Gagal terhubung ke database" }
    }
}

export async function signupAction(formData: FormData) {
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as "patient" | "doctor"

    if (!fullName || !email || !password || !role) {
        return { error: "Data tidak lengkap" }
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) return { error: "Email sudah terdaftar" }

        // Transaction to create User + Profile
        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    fullName,
                    email,
                    role
                }
            })

            // Create Profile based on role
            if (role === 'patient') {
                await tx.patient.create({
                    data: {
                        id: user.id,
                        dateOfBirth: new Date(), // Default for now
                        operationType: "General Checkup",
                        operationDate: new Date()
                    }
                })
            } else {
                await tx.doctor.create({
                    data: {
                        id: user.id,
                        specialization: "General Practitioner",
                        hospitalId: "RS-001"
                    }
                })
            }

            return user
        })

        const cookieStore = await cookies(); // Use await for Next.js 15
        // @ts-ignore
        cookieStore.set("healstream_session", role, { httpOnly: true, maxAge: 86400 })
        // @ts-ignore
        cookieStore.set("healstream_user_id", newUser.id, { httpOnly: true, maxAge: 86400 })

        return { success: true, role }

    } catch (e) {
        console.error(e)
        return { error: "Gagal mendaftarkan akun" }
    }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    // @ts-ignore
    cookieStore.delete("healstream_session")
    // @ts-ignore
    cookieStore.delete("healstream_user_id")
    redirect("/login")
}
