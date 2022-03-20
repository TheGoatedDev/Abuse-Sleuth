import { Schema, ValidationError } from "joi";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const requireValidation = ({
    querySchema,
    bodySchema,
}: {
    querySchema: Schema;
    bodySchema: Schema;
}) => {
    return async (
        req: NextApiRequest,
        res: NextApiResponse<GenericHTTPResponse>,
        next: any
    ) => {
        const errors: ValidationError[] = [];

        if (querySchema) {
            const queryValidation = querySchema.validate(req.query);
            if (queryValidation.error) {
                errors.push(queryValidation.error);
            }
        }

        if (bodySchema) {
            const bodyValidation = bodySchema.validate(req.body);
            if (bodyValidation.error) {
                errors.push(bodyValidation.error);
            }
        }

        if (errors.length > 0) {
            const details = errors
                .map((error) =>
                    error.details.map((detail) => detail.message).join(", ")
                )
                .join(", ");

            res.status(422).send({
                ok: false,
                error: details,
            });
            return;
        }

        next();
    };
};

export default requireValidation;
