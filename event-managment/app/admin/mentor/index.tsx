'use client'

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
import { getAllMentorsAction } from '@/server/actions/mentor'
import { UserTypeWithTeams } from '@/types/database/user'

import Update from './update'

export default function MentorTable() {
    const [mentor, setMentor] = useState<UserTypeWithTeams[]>()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<UserTypeWithTeams>()

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getAllMentorsAction()
                setMentor(data)
            } catch (error) {
                console.log({ error })
            }
        }

        getData()
    }, [])

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <div className="rounded-xl border border-white/30 bg-white/50 p-6 shadow-lg backdrop-blur-lg">
                    <h2 className="mb-6 text-center text-2xl font-bold text-blue-800">
                        Mentor List
                    </h2>

                    <div className="overflow-x-auto rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-blue-100">
                                    <TableHead className="w-[80px] font-semibold text-blue-900">
                                        S.No
                                    </TableHead>
                                    <TableHead className="font-semibold text-blue-900">
                                        Mentor Name
                                    </TableHead>
                                    <TableHead className="text-right font-semibold text-blue-900">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mentor && mentor.length > 0 ? (
                                    mentor.map((team, index) => (
                                        <TableRow
                                            key={index}
                                            className="transition hover:bg-blue-50"
                                        >
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{team.name}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedRow(team)
                                                        setIsOpen(true)
                                                    }}
                                                    className="hover:bg-blue-600 hover:text-white"
                                                >
                                                    Update
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="py-6 text-center text-gray-500"
                                        >
                                            No mentors found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <Update isOpen={isOpen} setIsOpen={setIsOpen} data={selectedRow} />
        </div>
    )
}
