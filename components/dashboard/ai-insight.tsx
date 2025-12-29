"use client"

import * as React from "react"
import { Bot, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AIInsightProps {
    analysis?: string | null
    status?: "normal" | "observation" | "critical" | null
    isLoading?: boolean
}

export function AIInsight({ analysis, status, isLoading }: AIInsightProps) {
    if (!analysis && !isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Medical Insight
                    </CardTitle>
                    <CardDescription>Submit your vitals to receive an analysis.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    No data analyzed yet.
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Analysis
                    </CardTitle>
                    {status && (
                        <Badge variant={status}>
                            {status.toUpperCase()}
                        </Badge>
                    )}
                </div>
                <CardDescription>Based on your recent inputs</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                        <Bot className="h-4 w-4" />
                        Generating insights...
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm leading-relaxed">{analysis}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
