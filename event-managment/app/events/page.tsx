'use client'

import {
    Award,
    Brain,
    Code,
    Coffee,
    Dumbbell,
    Gamepad2,
    Lightbulb,
    Medal,
    Presentation,
    Trophy,
    Users,
    Utensils
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type TimelineEvent = {
    id: number
    title: string
    time: string
    day: number
    description: string
    icon: React.ReactNode
    category: 'mentor' | 'jury' | 'final' | 'sports' | 'other'
}

export default function Home() {
    const [activeDay, setActiveDay] = useState<number>(1)

    const events: TimelineEvent[] = [
        // Day 1
        {
            id: 1,
            title: 'Opening Ceremony',
            time: '09:00 AM',
            day: 1,
            description: 'Welcome address, introduction to the hackathon, and team formation.',
            icon: <Users className="h-5 w-5" />,
            category: 'other'
        },
        {
            id: 2,
            title: 'Hacking Begins',
            time: '10:30 AM',
            day: 1,
            description: 'Start your engines! Begin working on your innovative projects.',
            icon: <Code className="h-5 w-5" />,
            category: 'other'
        },
        {
            id: 3,
            title: 'Mentor Round 1',
            time: '02:00 PM',
            day: 1,
            description:
                'First mentoring session to help teams refine their ideas and provide technical guidance.',
            icon: <Lightbulb className="h-5 w-5" />,
            category: 'mentor'
        },
        {
            id: 4,
            title: 'Sports Activity: Outdoor Games',
            time: '06:00 PM',
            day: 1,
            description:
                'Take a break and energize yourself with fun outdoor games and activities.',
            icon: <Dumbbell className="h-5 w-5" />,
            category: 'sports'
        },
        {
            id: 5,
            title: 'Dinner',
            time: '08:00 PM',
            day: 1,
            description: 'Refuel with a delicious dinner and network with other participants.',
            icon: <Utensils className="h-5 w-5" />,
            category: 'other'
        },

        // Day 2
        {
            id: 6,
            title: 'Breakfast',
            time: '07:30 AM',
            day: 2,
            description: 'Start your day with a nutritious breakfast to fuel your coding session.',
            icon: <Coffee className="h-5 w-5" />,
            category: 'other'
        },
        {
            id: 7,
            title: 'Mentor Round 2',
            time: '10:00 AM',
            day: 2,
            description:
                'Second mentoring session to provide feedback on progress and help overcome challenges.',
            icon: <Brain className="h-5 w-5" />,
            category: 'mentor'
        },
        {
            id: 8,
            title: 'Lunch',
            time: '01:00 PM',
            day: 2,
            description: 'Take a break for lunch and recharge for the afternoon session.',
            icon: <Utensils className="h-5 w-5" />,
            category: 'other'
        },
        {
            id: 9,
            title: 'Sports Activity: Gaming Tournament',
            time: '03:00 PM',
            day: 2,
            description: 'Relax and have fun with a competitive gaming tournament.',
            icon: <Gamepad2 className="h-5 w-5" />,
            category: 'sports'
        },
        {
            id: 10,
            title: 'Jury Round 1',
            time: '06:00 PM',
            day: 2,
            description: 'First evaluation by the jury to assess progress and provide feedback.',
            icon: <Presentation className="h-5 w-5" />,
            category: 'jury'
        },
        {
            id: 11,
            title: 'Dinner',
            time: '08:30 PM',
            day: 2,
            description: 'Enjoy dinner and prepare for the final stretch of the hackathon.',
            icon: <Utensils className="h-5 w-5" />,
            category: 'other'
        },

        // Day 3
        {
            id: 12,
            title: 'Breakfast',
            time: '07:30 AM',
            day: 3,
            description: 'Final day breakfast to energize for the last push.',
            icon: <Coffee className="h-5 w-5" />,
            category: 'other'
        },
        {
            id: 13,
            title: 'Jury Round 2',
            time: '10:00 AM',
            day: 3,
            description: 'Second jury evaluation to review progress and provide final guidance.',
            icon: <Award className="h-5 w-5" />,
            category: 'jury'
        },
        {
            id: 14,
            title: 'Hacking Ends',
            time: '12:00 PM',
            day: 3,
            description: 'Pencils down! Time to finalize your presentations.',
            icon: <Code className="h-5 w-5" />,
            category: 'other'
        },
        {
            id: 15,
            title: 'Final Evaluation',
            time: '02:00 PM',
            day: 3,
            description: 'Present your projects to the judges for the final evaluation.',
            icon: <Trophy className="h-5 w-5" />,
            category: 'final'
        },
        {
            id: 16,
            title: 'Closing Ceremony & Awards',
            time: '05:00 PM',
            day: 3,
            description: 'Celebrate the end of the hackathon and recognize outstanding projects.',
            icon: <Medal className="h-5 w-5" />,
            category: 'other'
        }
    ]

    const filteredEvents = events.filter(event => event.day === activeDay)
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-indigo-900">
            <div className="container mx-auto px-4">
                <main className="py-12">
                    <section className="mb-12 text-center">
                        <h1 className="mb-4 bg-white bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                            36-Hour Hackathon
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-yellow-100 md:text-700 md:text-xl">
                            Join us for an exciting 36-hour journey of innovation, collaboration,
                            and fun activities. Track your progress through our interactive timeline
                            below.
                        </p>
                    </section>

                    <div className="space-y-2">
                        <div className="mb-8 flex justify-center">
                            <div className="inline-flex rounded-lg bg-white/40 p-1 shadow-lg backdrop-blur-lg">
                                {[1, 2, 3].map(day => (
                                    <Button
                                        key={day}
                                        variant={activeDay === day ? 'default' : 'ghost'}
                                        className={cn(
                                            'rounded-md px-6',
                                            activeDay === day
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-700'
                                        )}
                                        onClick={() => setActiveDay(day)}
                                    >
                                        Day {day}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 transform bg-blue-200 md:left-1/2" />

                            <div className="space-y-12">
                                {filteredEvents.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className={cn(
                                            'relative flex flex-col gap-4 md:flex-row md:items-center',
                                            index % 2 === 0
                                                ? 'md:flex-row'
                                                : 'md:flex-row-reverse md:text-right'
                                        )}
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full bg-white shadow-md md:left-1/2">
                                            <div
                                                className={cn(
                                                    'flex h-6 w-6 items-center justify-center rounded-full',
                                                    event.category === 'mentor'
                                                        ? 'bg-purple-100 text-purple-600'
                                                        : event.category === 'jury'
                                                          ? 'bg-amber-100 text-amber-600'
                                                          : event.category === 'final'
                                                            ? 'bg-emerald-100 text-emerald-600'
                                                            : event.category === 'sports'
                                                              ? 'bg-pink-100 text-pink-600'
                                                              : 'bg-blue-100 text-blue-600'
                                                )}
                                            >
                                                {event.icon}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div
                                            className={cn(
                                                'ml-12 md:ml-0 md:w-1/2',
                                                index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                            )}
                                        >
                                            <Card className="overflow-hidden border-blue-100 bg-gradient-to-r from-red-800/20  to-blue-500/20   hover:shadow-lg">
                                                <div className="p-4">
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <h3 className="text-lg font-bold text-white">
                                                            {event.title}
                                                        </h3>
                                                        <span
                                                            className={cn(
                                                                'rounded-full px-2 py-1 text-xs font-medium',
                                                                event.category === 'mentor'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : event.category === 'jury'
                                                                      ? 'bg-amber-100 text-amber-700'
                                                                      : event.category === 'final'
                                                                        ? 'bg-emerald-100 text-emerald-700'
                                                                        : event.category ===
                                                                            'sports'
                                                                          ? 'bg-pink-100 text-pink-700'
                                                                          : 'bg-blue-100 text-blue-700'
                                                            )}
                                                        >
                                                            {event.time}
                                                        </span>
                                                    </div>
                                                    <p className="text-white">
                                                        {event.description}
                                                    </p>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <div className="inline-flex items-center gap-4 rounded-lg bg-white p-4 shadow-lg backdrop-blur-lg">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                    <span className="text-sm text-slate-700">Mentor Rounds</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                    <span className="text-sm text-slate-700">Jury Rounds</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm text-slate-700">Final Evaluation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                                    <span className="text-sm text-slate-700">
                                        Sports Activities
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
