'use server'

import { Types } from 'mongoose'

import { addMentor, assignTeam, getAllMentors, getMentorByEmail } from '@/server/functions/mentor'
import { UserType } from '@/types/database/user'

export const addMentorAction = async ({
    name,
    email,
    password,
    role,
    teams,
    volunteer
}: Omit<UserType, '_id'>) => {
    try {
        await addMentor({
            name,
            email,
            password,
            role,
            teams,
            volunteer
        })
    } catch (error) {
        console.log({ error })
    }
}

export const getAllMentorsAction = async () => {
    try {
        return await getAllMentors()
    } catch (error) {
        console.log({ error })
    }
}

export const assignTeamAction = async (mentorId: string, teamId: Types.ObjectId) => {
    try {
        await assignTeam(mentorId, teamId)
    } catch (error) {
        console.log({ error })
    }
}

export const getMentorByEmailAction = async (email: string) => {
    try {
        const data = await getMentorByEmail(email)
        return JSON.stringify(data)
    } catch (error) {
        console.log({ error })
    }
}
