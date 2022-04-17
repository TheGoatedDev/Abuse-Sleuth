import Joi from "joi";

export const oauthAuthenticateSchema = Joi.object({
    token: Joi.string().required(),
});
