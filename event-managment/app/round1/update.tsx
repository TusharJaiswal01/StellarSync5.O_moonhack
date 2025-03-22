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
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { updateRoundOneDataAction } from '@/server/actions/team'
import { TeamType } from '@/server/database/models/team'

interface Props {
    data?: TeamType
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const Update: FC<Props> = ({ data, isOpen, setIsOpen }) => {
    const [formData, setFormData] = useState({
        mentor: '',
        originality: 0,
        problemSolutionFit: 0,
        feasibility: 0,
        teamPotential: 0,
        presentation: 0,
        remark: ''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        if (!data) {
            return toast.error('Data not found')
        }

        await updateRoundOneDataAction(
            data._id,
            formData.mentor,
            formData.originality,
            formData.problemSolutionFit,
            formData.feasibility,
            formData.teamPotential,
            formData.presentation,
            formData.remark
        )

        window.location.reload()
        setIsOpen(false)
    }

    useEffect(() => {
        if (data)
            setFormData({
                mentor: data.mentor,
                originality: data.round_one.originality,
                problemSolutionFit: data.round_one.problem_solution_fit,
                feasibility: data.round_one.feasibility,
                teamPotential: data.round_one.team_potential,
                presentation: data.round_one.presentation,
                remark: data.round_one.remark
            })
    }, [data])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-gray-200">
                <DialogHeader>
                    <DialogTitle className="text-white">Update Data</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Update the following fields with new data.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {[
                        { label: "Originality", name: "originality" },
                        { label: "Problem Solution Fit", name: "problemSolutionFit" },
                        { label: "Feasibility", name: "feasibility" },
                        { label: "Team Potential", name: "teamPotential" },
                        { label: "Presentation", name: "presentation" },
                        { label: "Remark", name: "remark" }
                    ].map((field) => (
                        <div key={field.name} className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor={field.name} className="text-right text-gray-300">
                                {field.label}
                            </label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleInputChange}
                                className="col-span-3 bg-gray-800 text-gray-200 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="border-gray-600 text-gray-900 hover:bg-gray-700">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500 text-white">
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Update
