import mongoose from 'mongoose'

const {Schema, model} = mongoose

const postSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        post: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export const Posts = model('Posts', postSchema)