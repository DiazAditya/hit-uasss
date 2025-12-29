import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 md:px-6 space-y-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Recovery Reimagined with AI
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8">
              HealStream connects post-op patients with intelligent monitoring.
              Track vitals, detect risks early, and recover with confidence at home.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/dashboard">
                Start Monitoring <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <Zap className="h-10 w-10 text-yellow-500 mb-2" />
              <CardTitle>AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              Gemini AI analyzes your vitals in real-time to detect early signs of complications like infection or fever.
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <Activity className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Continuous Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              Easily log heart rate, temperature, and pain levels. Visualize your recovery trends with interactive charts.
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>Safety First</CardTitle>
            </CardHeader>
            <CardContent>
              Instant emergency SOS features and immediate risk categorization (Normal, Observation, Critical).
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
