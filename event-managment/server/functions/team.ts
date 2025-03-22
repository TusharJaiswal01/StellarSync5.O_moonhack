import connect_db from '../database'
import TeamModel, { TeamType } from '../database/models/team'

export const getTeamData = async () => {
    try {
        await connect_db()
        const data = await TeamModel.find()
        return JSON.parse(JSON.stringify(data)) as TeamType[]
    } catch (error) {
        console.log({ error })
    }
}

export const updateRoundOneData = async (
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
        await connect_db()
        const team = await TeamModel.findById(id)
        if (!team) {
            throw new Error('Team not found')
        }

        team.mentor = mentor

        team.round_one.originality = originality
        team.round_one.problem_solution_fit = problemSolutionFit
        team.round_one.feasibility = feasibility
        team.round_one.team_potential = teamPotential
        team.round_one.presentation = presentation
        team.round_one.remark = remark

        await team.save()
        return team
    } catch (error) {
        console.log({ error })
    }
}

export const addData = async (name: string, email: string) => {
    try {
        await connect_db()
        const team = new TeamModel({
            team_name: name,
            email,
            members: [],
            mentor: '',
            round_one: {
                originality: 0,
                problem_solution_fit: 0,
                feasibility: 0,
                team_potential: 0,
                presentation: 0,
                remark: ''
            }
        })
        await team.save()
        return team
    } catch (error) {
        console.log({ error })
    }
}
