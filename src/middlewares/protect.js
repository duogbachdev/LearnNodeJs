const protect = async (req, res, next) => {

    // Get token
    const authHeader = req.headers.authrization;
    const token = authHeader && authHeader.split(' ')[1];

    // check token in token header
    if (!token) {
        return next(
            console.log("You're not logged in!")
        );
    }

    // token verify

    // search user

    // check if user doesn't exist

    next();
}

export default protect;

