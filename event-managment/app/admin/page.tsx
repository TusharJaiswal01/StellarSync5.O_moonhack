'use client'

import { FC, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { addMentorAction } from '@/server/actions/mentor'
import { addDataAction } from '@/server/actions/team'

import MentorTable from './mentor'

const Page: FC = () => {
    const [team, setTeam] = useState({
        name: '',
        email: ''
    })
    const [mentorValue, setMentorValue] = useState({
        name: '',
        email: '',
        password: '',
        role: 'mentor',
        teams: [],
        volunteer: {
            name: '',
            email: ''
        }
    })

    const handleSubmitTeam = async (e: React.FormEvent) => {
        e.preventDefault()

        await addDataAction(team.name, team.email)
        setTeam({ name: '', email: '' })
    }

    const handleSubmitMentor = async (e: React.FormEvent) => {
        e.preventDefault()

        await addMentorAction(mentorValue)
        setMentorValue({
            name: '',
            email: '',
            password: '',
            role: 'mentor',
            teams: [],
            volunteer: { name: '', email: '' }
        })
    }

    return (
        <div className="min-h-screen w-full bg-blue-300 px-6 py-12">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
                {/* Team Form */}
                <Card className="rounded-xl border border-white/30 bg-white/40 shadow-xl backdrop-blur-md transition-all">
                    <CardHeader>
                        <CardTitle className="text-center text-xl text-blue-800">
                            Add Team
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitTeam} className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Team name"
                                value={team.name}
                                onChange={e => setTeam({ ...team, name: e.target.value })}
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Team email"
                                value={team.email}
                                onChange={e => setTeam({ ...team, email: e.target.value })}
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Mentor Form */}
                <Card className="rounded-xl border border-white/30 bg-white/40 shadow-xl backdrop-blur-md transition-all">
                    <CardHeader>
                        <CardTitle className="text-center text-xl text-blue-800">
                            Add Mentor
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitMentor} className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Mentor name"
                                value={mentorValue.name}
                                onChange={e =>
                                    setMentorValue({ ...mentorValue, name: e.target.value })
                                }
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Mentor email"
                                value={mentorValue.email}
                                onChange={e =>
                                    setMentorValue({ ...mentorValue, email: e.target.value })
                                }
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Mentor password"
                                value={mentorValue.password}
                                onChange={e =>
                                    setMentorValue({ ...mentorValue, password: e.target.value })
                                }
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Volunteer name"
                                value={mentorValue.volunteer.name}
                                onChange={e =>
                                    setMentorValue({
                                        ...mentorValue,
                                        volunteer: {
                                            ...mentorValue.volunteer,
                                            name: e.target.value
                                        }
                                    })
                                }
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Volunteer email"
                                value={mentorValue.volunteer.email}
                                onChange={e =>
                                    setMentorValue({
                                        ...mentorValue,
                                        volunteer: {
                                            ...mentorValue.volunteer,
                                            email: e.target.value
                                        }
                                    })
                                }
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Mentor Table Section */}
            <div className="mx-auto mt-12 max-w-6xl">
                <MentorTable />
            </div>
        </div>
    )
}

export default Page
