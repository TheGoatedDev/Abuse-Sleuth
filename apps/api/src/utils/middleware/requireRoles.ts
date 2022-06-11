import { NextFunction, Request, Response } from "express";
import { ASRequest } from "types/custom";

import { UserRole } from "@abuse-sleuth/prisma";

export const requireRoles = (allowRoles: UserRole[]) => {
    return async (req: ASRequest, res: Response, next: NextFunction) => {
        if (allowRoles.includes(req.user?.userRole ?? "USER")) {
            next();
        }

        return res.status(401).send({
            ok: false,
            error: "Not Authorised",
        });
    };
};

export const requireStaff = requireRoles(["DEVELOPER", "ADMIN"]);

export default requireRoles;
