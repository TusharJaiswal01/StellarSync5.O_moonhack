'use server'

import { addData, getTeamData, updateRoundOneData } from '@/server/functions/team'

export const getTeamDataAction = async () => {
    try {
        return await getTeamData()
    } catch (error) {
        console.log({ error })
    }
}

export const updateRoundOneDataAction = async (
    id: string,
    mentor: string,
    originality: number,
    problemSolutionFit: number,
    feasibility: number,
    teamPotential: number,
    presentation: number,
    remark: string
) => {
    try {
        const data = await updateRoundOneData(
            id,
            mentor,
            originality,
            problemSolutionFit,
            feasibility,
            teamPotential,
            presentation,
            remark
        )
        return JSON.stringify(data)
    } catch (error) {
        console.log({ error })
    }
}

export const addDataAction = async (name: string, email: string) => {
    try {
        const data = await addData(name, email)
        return JSON.stringify(data)
    } catch (error) {
        console.log({ error })
    }
}
