import Joi from "joi";

export const scanSingleIPSchema = Joi.object({
    ipAddress: Joi.string()
        .ip({
            version: ["ipv4", "ipv6"],
        })
        .required(),
});
