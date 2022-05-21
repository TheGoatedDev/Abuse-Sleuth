export const EnvConfig = {
    isProduction: process.env.NODE_ENV === "production",
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    apiURL: process.env.NEXT_PUBLIC_API_URL,
    stytch: {
        projectId: process.env.STYTCH_PROJECT_ID || null,
        secret: process.env.STYTCH_SECRET || null,
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY || null,
        signingSecret: process.env.STRIPE_WEBHOOK_SIGNING_SECRET || null,
    },
    public: {
        stytch: {
            publicToken: process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || null,
        },
        stripe: {
            publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || null,
        },
    },
};

export default EnvConfig;
