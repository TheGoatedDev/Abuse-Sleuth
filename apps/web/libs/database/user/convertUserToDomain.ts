import { User, UserBillingInfo } from "@prisma/client";

export const convertUserToDomain = (
    user: User & { userBillingInfo?: UserBillingInfo }
): UserDomainModel => {
    let userBillingInfo: UserBillingInfoDomainModel | undefined;

    if (user.userBillingInfo) {
        userBillingInfo = {
            id: user.userBillingInfo.id,
            userID: user.userBillingInfo.userId,
            stripeCustomerId: user.userBillingInfo.stripeCustomerId,
            plan: user.userBillingInfo.plan,
            createdAt: user.userBillingInfo.createdAt,
            updatedAt: user.userBillingInfo.updatedAt,
        };
    }

    return {
        id: user.id,
        username: user.username,
        name: user.name,
        image: user.image,
        email: user.email,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
        userBillingInfo,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
