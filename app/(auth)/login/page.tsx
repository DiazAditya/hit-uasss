"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "@/app/actions/auth"

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const formData = new FormData(e.currentTarget)
            const result = await loginAction(formData)

            if (result?.error) {
                setError(result.error)
                setIsLoading(false)
            } else if (result?.success) {
                // Redirect based on role
                if (result.role === 'doctor') {
                    window.location.href = "/doctor/dashboard"
                } else {
                    window.location.href = "/dashboard"
                }
                // Keep loading true while redirecting...
            } else {
                setError("Terjadi kesalahan yang tidak diketahui.")
                setIsLoading(false)
            }
        } catch (err) {
            console.error(err)
            setError("Gagal terhubung ke server.")
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 space-y-2 text-center md:text-left">
                <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
                <p className="text-slate-400">Sign in to access your dashboard.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm font-bold">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-slate-300 font-bold text-xs uppercase tracking-widest">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                        <Input
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-600 focus-visible:border-blue-600 h-11 rounded-xl"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-slate-300 font-bold text-xs uppercase tracking-widest">Password</Label>
                        <Link href="#" className="text-xs font-bold text-blue-500 hover:text-blue-400">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-600 focus-visible:border-blue-600 h-11 rounded-xl"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link href="/signup" className="font-bold text-blue-500 hover:text-blue-400 hover:underline">
                    Create Account
                </Link>
            </div>

            <div className="mt-12 flex justify-between items-center text-[10px] text-slate-600 font-medium uppercase tracking-wider">
                <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3" /> 256-bit SSL Encrypted
                </div>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
                    <Link href="#" className="hover:text-slate-400">Terms</Link>
                </div>
            </div>
        </div>
    )
}
