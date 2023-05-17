import mongoose from "mongoose";
import { userModel } from "./user";

const exerciseCollectionName = 'exercises'

const exerciseSchema = new mongoose.Schema({
    user: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: userModel
    },
    description:{ type:String, required: true},
    duration:{ type: Number, required: true, min:0 },
    date: { type: Date}
})

export const exerciseModel = mongoose.model(exerciseCollectionName, exerciseSchema)