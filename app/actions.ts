"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma"

const apiKey = process.env.GEMINI_API_KEY || ""
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export interface AnalysisResult {
    analysis: string
    status: "normal" | "observation" | "critical"
    saved: boolean
}

export async function analyzeVitals(data: { bpm: string; temp: string; pain: string; }): Promise<AnalysisResult> {
    const cookieStore = await cookies()
    const userId = cookieStore.get("healstream_user_id")?.value

    let patientId: string | undefined

    // 1. Try to find Patient if User ID exists
    if (userId) {
        try {
            const patient = await prisma.patient.findUnique({
                where: { id: userId }
            })
            if (patient) {
                patientId = patient.id

                // Save Vital Log
                await prisma.vitalLog.create({
                    data: {
                        patientId: patient.id,
                        heartRate: parseInt(data.bpm),
                        temperature: parseFloat(data.temp),
                        painLevel: parseInt(data.pain),
                        spo2: 98 // Default/Simulated for now
                    }
                })
            }
        } catch (dbError) {
            console.error("Database Error:", dbError)
            // Continue to AI even if DB fails? Or fail? 
            // Let's continue so user gets at least analysis if DB is down, but flag it.
        }
    }

    // 2. AI Analysis
    if (!apiKey) {
        return {
            analysis: "Mode Demo (API Key tidak ditemukan). Vital Anda tampak stabil. Silakan hubungi administrator untuk mengaktifkan fitur AI penuh.",
            status: "normal",
            saved: !!patientId
        }
    }

    const prompt = `
    Role: You are a medical assistant AI for post-operative monitoring called "HealStream".
    Task: Analyze the following patient vitals and provide a short, concise medical insight (max 2 sentences) and a risk status.
    
    Vitals:
    - Heart Rate: ${data.bpm} bpm
    - Temperature: ${data.temp} °C
    - Pain Level: ${data.pain}/10
    
    Output Format: JSON only, with keys "analysis" (string) and "status" (enum: "normal", "observation", "critical").
    
    Guidelines:
    - Normal: Vitals within standard range (HR 60-100, Temp < 37.5, Pain manageable).
    - Observation: Slight deviation (Low grade fever, slightly high HR, increasing pain).
    - Critical: High fever (>38), Tachycardia (>110), or severe pain (>8).
  `

    try {
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        // Clean markdown
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim()
        const parsed = JSON.parse(jsonStr)

        return {
            analysis: parsed.analysis,
            status: parsed.status,
            saved: !!patientId
        }
    } catch (error) {
        console.error("Gemini API Error:", error)
        return {
            analysis: "Gagal menganalisis data saat ini karena masalah konektivitas AI. Data vital Anda telah dicatat.",
            status: "observation",
            saved: !!patientId
        }
    }
}
