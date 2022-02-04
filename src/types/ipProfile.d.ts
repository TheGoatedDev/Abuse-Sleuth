type IIPProfileData = {
    lastAccessed: Date;
    createdAt: Date;
    updatedAt: Date;
};

type IIPProfile = {
    ipAddress: string;
    data: IIPProfileData;
};
