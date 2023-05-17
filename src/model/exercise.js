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
    date: { type: String, match: /^\d{4}-\d{2}-\d{2}$/, required: true }
    //date: { type: String, required: true}
})

export const exerciseModel = mongoose.model(exerciseCollectionName, exerciseSchema)