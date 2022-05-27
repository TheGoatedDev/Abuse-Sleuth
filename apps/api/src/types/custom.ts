import { Request } from "express";

import { User } from "@abuse-sleuth/prisma";

export interface ASRequest extends Request {
    user?: User;
}
