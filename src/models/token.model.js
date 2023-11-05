import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    expires: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true
    }
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
