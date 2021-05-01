import mongoose from "mongoose";

const Schema = mongoose.Schema
const landingPageSchema = new Schema({
    slogan: {
        type: String,
        required: true
    },
    sloganDescription: {
        type: String,
        required: true
    },
    ourVision: {
        type: String,
        required: true
    },
    ourPromise: {
        type: String,
        required: true
    },
    ourStory: {
        type: String,
        required: true
    },
    
}, {collection: 'landing_page'});

/**
 * @param name the singular/plural name of the Model
 * @param the schema associated with the model
 */
const LandingPage = mongoose.model('landing_page', landingPageSchema)

export default LandingPage