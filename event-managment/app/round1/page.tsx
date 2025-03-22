'use client'

import {
    MessageSquareText,
    Pencil,
    Presentation,
    ShieldCheck,
    Sparkles,
    Target,
    Users
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { getUserAction } from '@/server/actions/user'
import { TeamType } from '@/server/database/models/team'

import Update from './update'

export default function Page() {
    const [teams, setTeams] = useState<TeamType[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<TeamType>()

    useEffect(() => {
        const getData = async () => {
            const user = await getUserAction()

            if (!user.data) {
                window.location.href = '/signin'
                return
            }

            setTeams(user.data.teams)
        }

        getData()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-indigo-900 text-white px-4 w-full">
            <div className="container mx-auto py-10 w-full max-w-full">
                <div className="rounded-2xl border border-white/40 bg-blue-800/30 p-6 md:p-8 shadow-xl backdrop-blur-md w-full">
                    <h2 className="mb-4 flex items-center gap-2 text-lg md:text-2xl font-bold text-white">
                        <Users className="text-blue-400" />
                        Team Mentor Assignments
                    </h2>

                    <p className="mb-4 md:mb-6 text-xs md:text-sm font-semibold text-red-400">
                        ⚠️ Total Points Should be out of 20
                    </p>

                    {/* 📱 Mobile View - Card Layout */}
                    <div className="grid gap-4 sm:hidden">
                        {teams.map((team, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-blue-600 bg-blue-800/40 p-4 shadow-md backdrop-blur-md w-full"
                            >
                                <h3 className="mb-2 text-lg font-bold text-white">
                                    #{index + 1} {team.team_name}
                                </h3>
                                <p className="text-sm text-blue-300">
                                    <strong>Mentor:</strong> {team.mentor}
                                </p>
                                <p className="text-sm text-blue-300">
                                    <Sparkles className="inline-block size-4 text-blue-400" />{' '}
                                    <strong>Originality:</strong>{' '}
                                    {team.round_one.originality}
                                </p>
                                <p className="text-sm text-blue-300">
                                    <Target className="inline-block size-4 text-blue-400" />{' '}
                                    <strong>Problem Fit:</strong>{' '}
                                    {team.round_one.problem_solution_fit}
                                </p>
                                <p className="text-sm text-blue-300">
                                    <ShieldCheck className="inline-block size-4 text-blue-400" />{' '}
                                    <strong>Feasibility:</strong>{' '}
                                    {team.round_one.feasibility}
                                </p>
                                <p className="text-sm text-blue-300">
                                    <Users className="inline-block size-4 text-blue-400" />{' '}
                                    <strong>Team Potential:</strong>{' '}
                                    {team.round_one.team_potential}
                                </p>
                                <p className="text-sm text-blue-300">
                                    <Presentation className="inline-block size-4 text-blue-400" />{' '}
                                    <strong>Presentation:</strong>{' '}
                                    {team.round_one.presentation}
                                </p>
                                <p className="text-sm text-blue-300">
                                    <MessageSquareText className="inline-block size-4 text-blue-400" />{' '}
                                    <strong>Remark:</strong> {team.round_one.remark}
                                </p>

                                <div className="mt-3 flex justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedRow(team)
                                            setIsOpen(true)
                                        }}
                                        className="border border-blue-500 text-blue-300 hover:bg-blue-600 hover:text-white"
                                    >
                                        <Pencil className="mr-1 size-4 text-blue-300" />
                                        Update
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 🖥️ Desktop View - Table Layout */}
                    <div className="hidden sm:block w-full max-w-full">
                        <Table className="w-full table-fixed">
                            <TableHeader>
                                <TableRow className="bg-blue-900/60 text-sm">
                                    <TableHead className="w-[40px] md:w-[60px] font-extrabold text-blue-300">
                                        #
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-300">
                                        Team
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-300">
                                        Mentor
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-300">
                                        Originality
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-300">
                                        Problem Fit
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-300">
                                        Feasibility
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-300">
                                        Team Potential
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-300">
                                        Presentation
                                    </TableHead>
                                    <TableHead className="font-extrabold text-blue-300">
                                        Remark
                                    </TableHead>
                                    <TableHead className="text-right font-extrabold text-blue-300">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teams.map((team, index) => (
                                    <TableRow
                                        key={index}
                                        className="text-sm transition hover:bg-blue-800/50"
                                    >
                                        <TableCell className="font-bold text-white">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-semibold text-white">
                                            {team.team_name}
                                        </TableCell>
                                        <TableCell className="font-medium text-blue-300">
                                            {team.mentor}
                                        </TableCell>
                                        <TableCell>{team.round_one.originality}</TableCell>
                                        <TableCell>{team.round_one.problem_solution_fit}</TableCell>
                                        <TableCell>{team.round_one.feasibility}</TableCell>
                                        <TableCell>{team.round_one.team_potential}</TableCell>
                                        <TableCell>{team.round_one.presentation}</TableCell>
                                        <TableCell>{team.round_one.remark}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedRow(team)
                                                    setIsOpen(true)
                                                }}
                                                className="border border-blue-500 text-blue-300 hover:bg-blue-600 hover:text-white"
                                            >
                                                <Pencil className="mr-1 size-4 text-blue-300" />
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <Update isOpen={isOpen} setIsOpen={setIsOpen} data={selectedRow} />
        </div>
    )
}
