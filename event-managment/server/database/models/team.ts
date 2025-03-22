import { Model, model, models, Schema } from 'mongoose'

export type TeamType = {
    _id: string
    team_name: string
    email: string
    members: string[]
    mentor: string
    round_one: {
        originality: number
        problem_solution_fit: number
        feasibility: number
        team_potential: number
        presentation: number
        remark: string
    }
}

export type roundOneType = {
    originality: number
    problem_solution_fit: number
    feasibility: number
    team_potential: number
    presentation: number
    remark: string
}

const schema = new Schema<TeamType>(
    {
        team_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        members: { type: [String] },
        mentor: { type: String, default: '' },
        round_one: {
            originality: { type: Number, default: 0 },
            problem_solution_fit: { type: Number, default: 0 },
            feasibility: { type: Number, default: 0 },
            team_potential: { type: Number, default: 0 },
            presentation: { type: Number, default: 0 },
            remark: { type: String, default: '' }
        }
    },
    {
        timestamps: true,
        collection: 'Teams',
        toJSON: { virtuals: true }
    }
)

const TeamModel: Model<TeamType> = models.Teams || model('Teams', schema)

export default TeamModel
