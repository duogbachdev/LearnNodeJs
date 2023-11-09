import { authService } from '../services/index.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    // calling service get type, statusCode, tokens
    const { type, message, statusCode, user, tokens } = 
        await authService.signin(email, password);

    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message: 'Messsage error'
        });
    }

    // return value
    return res.status(statusCode).json({
        type,
        message: 'Success',
        user,
        tokens
    });
}

export const signup = async (req, res) => {
    // calling auth service
    const { type, message, statusCode, user, tokens } = await authService.signup(
        req.body
    );

    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message: 'Error',
            user,
            tokens
        });
    }

    return res.status(statusCode).json({
        type,
        message: message,
        user,
        tokens
    });
}
