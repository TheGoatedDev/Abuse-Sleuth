type UserDomainModel = {
    id: string;

    username: string;
    name?: string;
    image?: string;

    email: string;
    emailVerified?: Date;

    password: string;

    twoFactorEnabled: boolean;
    twoFactorSecret?: string;

    userBillingInfo?: UserBillingInfoDomainModel;

    createdAt: Date;
    updatedAt: Date;
};

type UserBillingInfoDomainModel = {
    id: string;

    userID: string;

    stripeCustomerId: string;

    plan?: string;

    createdAt: Date;
    updatedAt: Date;
};
