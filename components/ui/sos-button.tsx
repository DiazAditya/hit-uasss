"use client"

import * as React from "react"
import { Phone, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SOSButton() {
    const handleSOS = () => {
        // In a real app, this would trigger a call or alert
        alert("SOS TRIGGGERED! Contacting emergency services...")
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                variant="destructive"
                size="lg"
                className="h-16 w-16 rounded-full shadow-lg shadow-red-500/50 animate-bounce hover:animate-none"
                onClick={handleSOS}
            >
                <span className="sr-only">Emergency SOS</span>
                <Phone className="h-8 w-8" />
            </Button>
        </div>
    )
}
