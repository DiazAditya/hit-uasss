import Link from "next/link"
import { ShieldCheck, Activity } from "lucide-react"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full grid lg:grid-cols-2">
            {/* Left Panel - Visuals */}
            <div className="hidden lg:flex flex-col justify-between bg-[#0f172a] p-10 text-white relative overflow-hidden">
                {/* Abstract Background Effect */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-0 w-full h-64 bg-blue-500/10 blur-[100px] -translate-y-1/2"></div>
                    {/* Simple SVG Wave pattern simulation */}
                    <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#3b82f6" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,138.7C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                    </svg>
                    {/* Heartbeat Line */}
                    <div className="absolute top-1/2 left-0 w-full h-32 flex items-center opacity-30">
                        <svg viewBox="0 0 500 150" className="w-full h-full stroke-blue-400 fill-none stroke-2">
                            <path d="M0,75 L50,75 L60,40 L70,110 L80,75 L150,75 L160,20 L180,130 L200,75 L280,75" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-white">
                        <div className="p-1 bg-blue-600 rounded-lg">
                            <Activity className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-xl">RPM Health</span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-6 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck className="h-3 w-3" />
                        HIPAA Compliant
                    </div>

                    <h1 className="text-5xl font-bold tracking-tight leading-tight">
                        Advanced Remote Patient Monitoring
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Connecting healthcare providers and patients with real-time health insights for better outcomes.
                    </p>

                    <div className="flex items-center gap-4 pt-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`w-12 h-12 rounded-full border-4 border-[#0f172a] bg-slate-700 flex items-center justify-center overflow-hidden`}>
                                    {/* Placeholder avatars */}
                                    <span className="text-xs text-slate-400">User</span>
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-[#0f172a] bg-blue-600 flex items-center justify-center text-xs font-bold">
                                +2k
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">Trusted Network</p>
                            <p className="text-xs text-slate-400">Join thousands of users today</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex justify-between text-xs text-slate-500 font-medium">
                    <p>© 2024 HealStream RPM</p>
                    <p>Help & Support</p>
                </div>
            </div>

            {/* Right Panel - Auth Forms */}
            <div className="bg-[#0b1121] flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
