import Logger from "@libs/utils/Logger";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import createLogReport from "./createLogReport";
import getLogReport from "./getLogReport";

const createOrGetLogReport = async (user: UserRecord) => {
    let logReportID: string = "";
    try {
        const doc = await createLogReport(user);
        logReportID = doc.id;
    } catch (error: any) {
        Logger.error("createOrGetLog", error);
        throw error;
    }

    return await getLogReport(logReportID);
};

export default createOrGetLogReport;
