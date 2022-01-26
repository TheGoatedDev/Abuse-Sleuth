import { GeneratedReport } from "@prisma/client";
import prisma from "@services/database/prisma";
import { GeneratedReportWithIPProfiles } from "@libs/types";

// TODO: Create Stripped Down Type Interface for the Return (Generated Report)
export const getReport = async (
    id: number
): Promise<GeneratedReport | null> => {
    const report = await prisma.generatedReport.findFirst({
        where: {
            generatedReportID: id,
        },
    });

    return report;
};

export const getReportWithIPProfiles = async (
    id: number
): Promise<GeneratedReportWithIPProfiles | null> => {
    const report = await prisma.generatedReport.findFirst({
        where: {
            generatedReportID: id,
        },
        include: {
            links: {
                include: {
                    ipProfile: true,
                },
            },
        },
    });

    return report;
};
