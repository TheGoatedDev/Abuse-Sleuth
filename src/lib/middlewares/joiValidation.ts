import withJoi from "next-joi";

const joiValidation = withJoi({
    onValidationError: (_, res, error) => {
        return res.status(400).json({
            ok: false,
            error: error.message,
        });
    },
});

export default joiValidation;
