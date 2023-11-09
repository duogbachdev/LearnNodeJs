import jwt from 'jsonwebtoken';
import moment from 'moment';

import Token from '../models/token.model.js';
import tokenTypes from '../config/token.js';

export const generateToken = (
    userId,
    expires,
    type,
    secret = 'ABCD'
) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    };
    return jwt.sign(payload, secret);
};

export const saveToken = async (token, userId, expires, type) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type
    });

    return tokenDoc;
}

export const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, 'ABCD');

    const tokenDoc = await Token.findOne({
        token,
        type,
        user: payload.sub
    });

    if (!tokenDoc) {
        return {
            type: 'Error',
            statusCode: 404,
            message: 'Token not found'
        }
    }

    return tokenDoc;
}

// used in auth services
export const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(
        10,
        'minutes'
    );

    const accessToken = generateToken(
        user.id,
        accessTokenExpires,
        tokenTypes.ACCESS
    );

    const refreshTokenExpires = moment().add(
        5,
        'days'
    );

    const refreshToken = generateToken(
        user.id,
        refreshTokenExpires,
        tokenTypes.REFRESH
    );

    await saveToken(
        accessToken,
        user.id,
        refreshTokenExpires,
        tokenTypes.REFRESH
    )

    return {
        accessToken,
        refreshToken
    }
}
