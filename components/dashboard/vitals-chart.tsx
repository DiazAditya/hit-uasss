"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface VitalsChartProps {
    data: any[]
}

export function VitalsChart({ data }: VitalsChartProps) {
    // We'll show temperature and BPM on the same chart or separate?
    // Let's do a combo chart or just show BPM for now, maybe toggleable later.
    // For simplicity, let's visualize Heart Rate trend.

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Recovery Trend</CardTitle>
                <CardDescription>Heart Rate & Temperature over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="time" className="text-xs text-muted-foreground" />
                            <YAxis className="text-xs text-muted-foreground" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                itemStyle={{ color: 'var(--foreground)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="bpm"
                                stroke="#0d9488"
                                fillOpacity={1}
                                fill="url(#colorBpm)"
                                name="Heart Rate (BPM)"
                            />
                            <Area
                                type="monotone"
                                dataKey="temp"
                                stroke="#f59e0b"
                                fillOpacity={1}
                                fill="url(#colorTemp)"
                                name="Temp (°C)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
