"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RoleSwitcher } from "@/components/auth/role-switcher"
import { signupAction } from "@/app/actions/auth"

export default function SignupPage() {
    const router = useRouter()
    const [role, setRole] = React.useState<"patient" | "doctor">("patient")
    const [showPassword, setShowPassword] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const formData = new FormData(e.currentTarget)
            // Append role explicitly as it's a state, not an input field in the main form (unless we add hidden input)
            formData.append("role", role)

            const result = await signupAction(formData)

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
            } else {
                setError("Terjadi kesalahan yang tidak diketahui.")
                setIsLoading(false)
            }
        } catch (err) {
            console.error(err)
            setError("Gagal menghubungi server.")
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 space-y-2 text-center md:text-left">
                <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
                <p className="text-slate-400">Join HealStream to start your health journey.</p>
            </div>

            <div className="mb-8 pl-1">
                <RoleSwitcher role={role} setRole={setRole} />
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm font-bold">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                    <Label className="text-slate-300 font-bold text-xs uppercase tracking-widest">Full Name</Label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                        <Input
                            name="fullName"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-600 focus-visible:border-blue-600 h-11 rounded-xl"
                            required
                        />
                    </div>
                </div>

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
                    <Label className="text-slate-300 font-bold text-xs uppercase tracking-widest">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
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

                <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" id="terms" className="mt-1 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-600" required />
                    <Label htmlFor="terms" className="text-slate-400 text-xs leading-relaxed cursor-pointer">
                        I agree to the <Link href="#" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-500 hover:underline">Privacy Policy</Link>.
                    </Label>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Create Account"
                    )}
                </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-blue-500 hover:text-blue-400 hover:underline">
                    Sign In
                </Link>
            </div>
        </div>
    )
}
