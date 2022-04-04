import Joi from "joi";

export const magicLinkSendSchema = Joi.object({
    email: Joi.string().email().required(),
});
