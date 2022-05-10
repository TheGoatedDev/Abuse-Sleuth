import Joi from "joi";

export const stripeCheckoutSchema = Joi.object({
    priceID: Joi.string().required(),
});
