type IAIPDBProfileData = {
    abuseScore: number;
    country: string;
    usageType: string;
    isp: string;
    domain: string;
    totalReports: number;
    totalDistinctReportee: number;
};

type IAIPDBProfileUpdateData = {
    abuseScore?: number;
    country?: string;
    usageType?: string;
    isp?: string;
    domain?: string;
    totalReports?: number;
    totalDistinctReportee?: number;
};
