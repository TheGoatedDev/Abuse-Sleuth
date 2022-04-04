import Joi from "joi";

export const magicLinkAuthenticateSchema = Joi.object({
    token: Joi.string().required(),
});
