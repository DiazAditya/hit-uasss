"use client"

import * as React from "react"
import { Heart, Thermometer, Activity, Upload, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface HealthFormData {
    bpm: string
    temp: string
    pain: string
    photo?: File | null
}

interface HealthFormProps {
    onSubmit: (data: HealthFormData) => void
    isLoading?: boolean
}

export function HealthForm({ onSubmit, isLoading }: HealthFormProps) {
    const [data, setData] = React.useState<HealthFormData>({
        bpm: "",
        temp: "",
        pain: "",
        photo: null,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(data)
        // Optional: Reset form or keep values? Keep values implies recent check. Reset implies fresh start. 
        // Let's reset for now or let parent handle.
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData({ ...data, photo: e.target.files[0] })
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Daily Vitals Check-in</CardTitle>
                <CardDescription>Enter your current health metrics for analysis.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="bpm" className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-rose-500" />
                            Heart Rate (BPM)
                        </Label>
                        <Input
                            id="bpm"
                            type="number"
                            placeholder="e.g. 72"
                            value={data.bpm}
                            onChange={(e) => setData({ ...data, bpm: e.target.value })}
                            required
                            min="30"
                            max="200"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="temp" className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-orange-500" />
                            Temperature (°C)
                        </Label>
                        <Input
                            id="temp"
                            type="number"
                            placeholder="e.g. 36.5"
                            step="0.1"
                            value={data.temp}
                            onChange={(e) => setData({ ...data, temp: e.target.value })}
                            required
                            min="30"
                            max="45"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="pain" className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-purple-500" />
                            Pain Level (1-10)
                        </Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="pain"
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={data.pain || "1"}
                                onChange={(e) => setData({ ...data, pain: e.target.value })}
                                className="flex-1"
                            />
                            <span className="w-8 text-center font-bold text-lg">{data.pain || 1}</span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="photo" className="flex items-center gap-2">
                            <Camera className="h-4 w-4 text-blue-500" />
                            Wound Photo (Optional)
                        </Label>
                        <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="cursor-pointer"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Analyzing..." : "Submit & Analyze"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
