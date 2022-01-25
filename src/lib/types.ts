import {
    GeneratedReport,
    IPProfile,
    ReportIPProfileLink,
} from "@prisma/client";

export interface Response<T> {
    ok: boolean;
    data: T;
}

export interface GET_AIPDB_Data {
    ipAddress: string;
    abuseScore: number;
    country: string;
    usageType: string;
    isp: string;
    domain: string;
    totalReports: number;
    totalDistinctReportee: number;
    createdAt: Date;
    updatedAt: Date;
}

// Generated Report Types
export type GeneratedReportWithIPProfiles = GeneratedReport & {
    links: (ReportIPProfileLink & {
        ipProfile: IPProfile;
    })[];
};
