import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    username: {
        type: String,
        required: [true, 'Please enter your usrename']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        minlength: 8,
        validate(value) {
            if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error(
                    'Password must contain at least one character and one number'
                )
            }
        }
    }
});

userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });

    return !!user;
}

const User = mongoose.model('User', userSchema);

export default User;
