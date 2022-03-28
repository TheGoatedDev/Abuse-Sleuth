import * as Stytch from "stytch";

export const stytchClient: Stytch.Client =
    (globalThis as any).stytchClient ||
    new Stytch.Client({
        project_id: process.env.STYTCH_PROJECT_ID,
        secret: process.env.STYTCH_SECRET,
        env:
            process.env.NODE_ENV === "production"
                ? Stytch.envs.live
                : Stytch.envs.test,
    });

if (process.env.NODE_ENV !== "production") {
    (globalThis as any).stytchClient = stytchClient;
}
