'use client'

import { FC, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { assignTeamAction } from '@/server/actions/mentor'
import { getTeamDataAction } from '@/server/actions/team'
import { TeamType } from '@/server/database/models/team'
import { UserTypeWithTeams } from '@/types/database/user'

interface Props {
    data?: UserTypeWithTeams
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const Update: FC<Props> = ({ data, isOpen, setIsOpen }) => {
    const [formData, setFormData] = useState('')
    const [unassignedTeams, setUnassignedTeams] = useState<TeamType[]>()

    const handleAssign = async () => {
        if (!data || !formData) {
            return toast.error('Please select a team')
        }

        try {
           
            await assignTeamAction(data._id, formData )
            toast.success('Team assigned successfully!')
            setIsOpen(false)
            window.location.reload()
        } catch (error) {
            toast.error('Failed to assign team')
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchTeams = async () => {
            if (data) {
                const allTeams = await getTeamDataAction()
                const unassigned = allTeams?.filter(team => !team.mentor)
                setUnassignedTeams(unassigned)
            }
        }

        fetchTeams()
    }, [data])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="rounded-2xl border border-white/30 bg-white/70 shadow-2xl backdrop-blur-lg">
                <DialogHeader>
                    <DialogTitle className="text-blue-900">Assign New Team</DialogTitle>
                    <DialogDescription className="text-blue-700">
                        You can assign an unassigned team to this mentor.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="text-sm">
                        <span className="text-muted-foreground">Mentor Name:</span>{' '}
                        <span className="font-semibold text-blue-800">{data?.name}</span>
                    </div>

                    <div>
                        <span className="text-muted-foreground text-sm">Teams assigned:</span>
                        <div className="mt-1 space-y-1">
                            {data?.teams.length ? (
                                data.teams.map((team, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 shadow"
                                    >
                                        {team?.team_name}
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-gray-500 italic">
                                    No teams assigned yet
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-end gap-2">
                        <Select value={formData} onValueChange={setFormData}>
                            <SelectTrigger className="w-[200px] border-blue-300 bg-white">
                                <SelectValue placeholder="Select a Team" />
                            </SelectTrigger>
                            <SelectContent className="text-sm font-medium">
                                {unassignedTeams && unassignedTeams.length > 0 ? (
                                    unassignedTeams.map(team => (
                                        <SelectItem key={team._id} value={team._id}>
                                            {team.team_name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">
                                        No unassigned teams
                                    </div>
                                )}
                            </SelectContent>
                        </Select>

                        <Button
                            onClick={handleAssign}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Assign
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="mt-4">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Update
