import { query } from "express";

const apiFeatures = async (req, model, populate) => {
    let query;
    const reqQuery = { ...req.query };

    // Finding resource
    query = model.find({});

    query = await query;

    if (!query) {
        throw new Error('No Data Found', 400);
    }

    return query;
}

export default apiFeatures