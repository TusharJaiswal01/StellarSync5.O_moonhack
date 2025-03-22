import { Model, model, models, Schema, Types } from 'mongoose'

import { UserType } from '@/types/database/user'

const schema = new Schema<UserType>(
    {
        name: { type: String, required: true },
        teams: { type: [Types.ObjectId], ref: 'Teams' },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: 'mentor' },
        volunteer: {
            name: { type: String, required: true },
            email: { type: String, required: true }
        }
    },
    {
        timestamps: true,
        collection: 'Users',
        toJSON: { virtuals: true }
    }
)

const UserModel: Model<UserType> = models.Users || model<UserType>('Users', schema)

export default UserModel
