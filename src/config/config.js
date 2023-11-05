import dotenv from 'dotenv';
import Joi from 'joi';

// setting env
dotenv.config({ path: 'config.env' });

// setting format env
const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        // DATABASE_CONNECTION: Joi.string().required().description('MongoDB URL'),
        // DATABASE_PASSWORD: Joi.string().default('').description('Mongo Password'),
        JWT_SECRET: Joi.string().default('').description('JWT Secret Key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description('Minutes After Which Access Tokens Expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description('Days After Which Refresh Tokens Expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('Minutes After Which Reset Password Token Expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('Minutes After Which Verify Email Token Expires'),
    }).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key'}}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    server: {
        port: envVars.PORT
    },
    db: {
        url: envVars.DATABASE_CONNECTION,
        password: envVars.DATABASE_PASSWORD
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMintues: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMintues: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    }
};

export default config;
