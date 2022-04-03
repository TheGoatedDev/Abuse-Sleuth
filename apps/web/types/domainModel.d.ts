type UserDomainModel = {
    id: string;

    username: string;
    name?: string;
    image?: string;

    email: string;
    emailVerified?: Date;

    twoFactorEnabled: boolean;

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

type IPProfileDomainModel = {
    id: string;
    ipAddress: string;
    version: "4" | "6";
    details?: IPProfileDetailsDomainModel;
    createdAt: Date;
    updatedAt: Date;
};

type IPProfileDetailsDomainModel = {
    id: string;

    countryCode?: string;
    privateAddress: boolean;

    createdAt: Date;
    updatedAt: Date;
};
