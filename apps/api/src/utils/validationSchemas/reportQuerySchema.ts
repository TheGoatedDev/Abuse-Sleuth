import Joi from "joi";

export const reportQuerySchema = Joi.object({
    reportID: Joi.string().required(),
});
