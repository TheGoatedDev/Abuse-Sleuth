import { Schema, ValidationError } from "joi";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const requireValidation = ({
    querySchema,
    bodySchema,
}: {
    querySchema?;
    bodySchema?;
}) => {
    return async (
        req: NextApiRequest,
        res: NextApiResponse<GenericHTTPResponse>,
        next: any
    ) => {
        const errors: ValidationError[] = [];

        // Check if Query Schema is present and run checks
        if (querySchema) {
            const queryValidation = querySchema.validate(req.query);
            if (queryValidation.error) {
                errors.push(queryValidation.error);
            }
        }

        // Check if Body Schema is present and run checks
        if (bodySchema) {
            const bodyValidation = bodySchema.validate(req.body);
            if (bodyValidation.error) {
                errors.push(bodyValidation.error);
            }
        }

        // Parse all errors to be readable to the frontend
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
