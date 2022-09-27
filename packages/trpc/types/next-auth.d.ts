import { User } from "@abuse-sleuth/prisma";

declare module "next-auth" {
    interface Session {
        user: User | null;
    }
}
