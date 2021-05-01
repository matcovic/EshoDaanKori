import mongoose from "mongoose";

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    
}, {timestamps: true});

/**
 * @param name the singular/plural name of the Model
 * @param the schema associated with the model
 */
const User = mongoose.model('User', userSchema)

export default User