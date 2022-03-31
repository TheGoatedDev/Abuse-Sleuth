import { AxiosInstance } from "axios";
import http from "http";
import https from "https";
import * as Stytch from "stytch";

export const StytchClient: Stytch.Client =
    (globalThis as any).stytchClient ||
    new Stytch.Client({
        project_id: process.env.STYTCH_PROJECT_ID as string,
        secret: process.env.STYTCH_SECRET as string,
        env:
            process.env.NODE_ENV === "production"
                ? Stytch.envs.live
                : Stytch.envs.test,
    });

const agentSecure = new https.Agent({
    keepAlive: true,
});

const agent = new http.Agent({
    keepAlive: true,
});

const cl = (StytchClient as any).client as AxiosInstance;

cl.defaults.httpsAgent = agentSecure;
cl.defaults.httpAgent = agent;

if (process.env.NODE_ENV !== "production") {
    (globalThis as any).stytchClient = StytchClient;
}
