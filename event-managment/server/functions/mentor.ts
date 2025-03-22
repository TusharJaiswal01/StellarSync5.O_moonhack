import { Types } from 'mongoose'

import { UserType, UserTypeWithTeams } from '@/types/database/user'

import connect_db from '../database'
import TeamModel from '../database/models/team'
import UserModel from '../database/models/user'

export const addMentor = async ({
    name,
    email,
    password,
    role,
    teams,
    volunteer
}: Omit<UserType, '_id'>) => {
    try {
        await connect_db()

        await UserModel.create({
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

export const getAllMentors = async () => {
    try {
        await connect_db()
        const data = await UserModel.find().populate('teams')
        return JSON.parse(JSON.stringify(data)) as UserTypeWithTeams[]
    } catch (error) {
        console.log({ error })
    }
}

export const assignTeam = async (mentorId: string, teamId: Types.ObjectId) => {
    try {
        await connect_db()
        const mentor = await UserModel.findById(mentorId)
        if (!mentor) {
            throw new Error('Mentor not found')
        }

        mentor.teams.push(teamId)
        await TeamModel.findByIdAndUpdate(teamId, {
            mentor: mentor.name
        })
        await mentor.save()
    } catch (error) {
        console.log({ error })
    }
}

export const getMentorByEmail = async (email: string) => {
    try {
        await connect_db()
        const data = await UserModel.findOne({ email }).populate('teams')

        if (!data) {
            throw new Error('Mentor not found')
        }

        return data as UserType
    } catch (error) {
        console.log({ error })
    }
}
