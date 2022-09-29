import getPortalURLController from "../../../controllers/users/billing/getPortalURL";
import { trpc } from "../../../initTRPC";

export const usersBillingRouter = trpc.router({
    getPortalURL: getPortalURLController,
});
