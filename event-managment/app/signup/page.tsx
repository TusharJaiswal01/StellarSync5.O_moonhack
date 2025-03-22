'use client'

import { CalendarDays, Sparkles, Users } from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100/30 to-white/20 p-6 backdrop-blur-sm md:p-10">
            <div className="mx-auto mb-12 max-w-5xl text-center">
                <h1 className="text-4xl font-bold md:text-5xl">Event Management Platform</h1>
                <p className="text-muted-foreground mt-4 text-lg">
                    Seamlessly manage mentors, volunteers, and teams for your events.
                </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                {/* Feature Card 1 */}
                <div className="rounded-2xl border bg-white/30 p-6 shadow-lg backdrop-blur-xl transition-all hover:scale-[1.02]">
                    <div className="mb-4 flex items-center gap-3">
                        <CalendarDays className="text-primary h-6 w-6" />
                        <h3 className="text-xl font-semibold">Plan and Schedule</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Organize and track your event timeline, sessions, and participants with
                        ease.
                    </p>
                </div>

                {/* Feature Card 2 */}
                <div className="rounded-2xl border bg-white/30 p-6 shadow-lg backdrop-blur-xl transition-all hover:scale-[1.02]">
                    <div className="mb-4 flex items-center gap-3">
                        <Users className="text-primary h-6 w-6" />
                        <h3 className="text-xl font-semibold">Team & Mentor Management</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Easily assign mentors to teams and track team performance.
                    </p>
                </div>

                {/* Feature Card 3 */}
                <div className="rounded-2xl border bg-white/30 p-6 shadow-lg backdrop-blur-xl transition-all hover:scale-[1.02]">
                    <div className="mb-4 flex items-center gap-3">
                        <Sparkles className="text-primary h-6 w-6" />
                        <h3 className="text-xl font-semibold">Smooth Onboarding</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Get started instantly with a clean and intuitive user experience.
                    </p>
                </div>
            </div>

            <div className="mt-20 text-center">
                <p className="text-xl font-semibold">Ready to elevate your next event?</p>
                <p className="text-muted-foreground mt-2">
                    Sign in or sign up to begin managing your teams and mentors effortlessly.
                </p>
            </div>
        </div>
    )
}
