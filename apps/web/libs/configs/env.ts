const EnvConfig = {
    isProduction: process.env.NODE_ENV === "production",
    stytch: {
        projectId: process.env.STYTCH_PROJECT_ID || null,
        secret: process.env.STYTCH_SECRET || null

    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY || null,
        signingSecret: process.env.STRIPE_WEBHOOK_SIGNING_SECRET || null
    },
    public: {
        stytch: {
            publicToken: process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || null
        },
        stripe: {
            publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || null
        }
    }
}


export default EnvConfig;