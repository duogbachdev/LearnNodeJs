import AppError from "./appError.js";

const handleA = (error) => {
    const message = 'Duplicated field'
    return new AppError(message, 400);
}

const handleB = (error) => {
    const message = 'Server field'
    return new AppError(message, 500);
}


export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = { ...err };
    if (error.code === 11000) error = handleA(error);
}
