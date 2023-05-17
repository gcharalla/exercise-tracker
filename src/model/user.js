import mongoose from "mongoose";

const userCollectionName= 'users'

const userSchema = new mongoose.Schema({
    username : { type: String, required: true },
})

export const userModel = mongoose.model(userCollectionName, userSchema)