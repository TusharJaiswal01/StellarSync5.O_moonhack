import { Types } from 'mongoose'

import { TeamType } from '@/server/database/models/team'

export type UserType = {
    _id: string
    name: string
    teams: Types.ObjectId[]
    role: string
    email: string
    password: string
    volunteer: {
        name: string
        email: string
    }
}

export type UserTypeWithTeams = Omit<UserType, 'teams'> & { teams: TeamType[] }
