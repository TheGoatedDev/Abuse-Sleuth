type IIPProfileData = {
    lastAccessed: Date;
    lastAccessedBy: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
};

type IIPProfile = {
    ipAddress: string;
    data: IIPProfileData;
};
