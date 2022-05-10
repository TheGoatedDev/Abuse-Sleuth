import Joi from "joi";

export const scanLogSchema = Joi.object({
    ipAddresses: Joi.array().items(Joi.string().ip()).required(),
});
