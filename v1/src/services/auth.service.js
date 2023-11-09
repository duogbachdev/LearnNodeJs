import User from '../models/user.model.js';

import bcrypt from 'bcrypt';
import { generateAuthTokens } from '../middlewares/token.js';

const saltRounds = 10;

const checkPassword = async (user, password) => {
    try {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return null;
        } else {
            return 'Password not match'
        }
    } catch (err) {
        return err.message;
    }
}


export const signin = async (email, password) => {
    if (!email || !password) {
        return {
            type: 'Error',
            statusCode: 400,
            message: 'Bad Request'
        }
    }

    const user = await User.findOne({ email }).select('+password');
    const result = await checkPassword(user, password);

    console.log('user: ', result);

    if (result) {
        return {
            type: 'Error',
            statusCode: 401,
            message: result
        }
    }

    if (!user) {
        return {
            type: 'Error',
            statusCode: 401,
            message: 'Not Found'
        }
    }

    const tokens = await generateAuthTokens(user);

    user.password = undefined

    return {
        type: 'Success',
        statusCode: 200,
        message: 'success',
        user,
        tokens
    }
}

export const signup = async (body) => {
    const { name, username, email, password } = body;

    if (!name || !username || !email || !password) {
        return {
            type: 'Error',
            message: 'Bad request',
            statusCode: 400
        };
    }
    if (password.length < 8) {
        return {
            type: 'Error',
            message: 'passwordLength',
            statusCode: 400
        }
    }

    const isEmailTaken = await User.isEmailTaken(email);

    if (isEmailTaken) {
        return {
            type: 'Error',
            message: 'emailToken',
            statusCode: 409
        }
    }

    // let newPassword = "";

    // Ma hoa MK
    // bcrypt.hash(password, 10, (err, hashedPassword) => {
    //     if (err) {
    //         console.log('Ma hoa loi')
    //     }
    //     newPassword = hashedPassword;
    // })

    const salt = await bcrypt.genSalt(saltRounds);

    const hash = await bcrypt.hash(password, salt);

    console.log('hash: ', hash);

    const user = await User.create({
        name,
        username,
        email,
        password: hash,
    });

    const tokens = await generateAuthTokens(user);

    // user.password = undefined;

    return {
        type: 'Success',
        message: 'successSignUp',
        statusCode: 201,
        user,
        tokens
    }
}
