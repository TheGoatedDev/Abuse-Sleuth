import { User } from "@abuse-sleuth/prisma";

type EmailPasswordFunc<T> = (email: string, password: string) => T;
type EmailFunc<T> = (email: string) => T;
type IDFunc<T> = (id: string) => T;
type AccessTokenFunc<T> = (accessToken: string) => T;
type RenewTokensFunc<T> = (accessToken: string, refreshToken: string) => T;
type CodeFunc<T> = (code: string, email: string) => T;

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export interface AuthProvider {
    //getUserByEmail: EmailFunc<Promise<User>>;
    getUserByID: IDFunc<Promise<User>>;
    registerUser: EmailPasswordFunc<Promise<void>>; // Registers the user and returns if successful
    loginUser: EmailPasswordFunc<Promise<AuthTokens>>; // Login the user and return Auth Tokens
    confirmRegistration: CodeFunc<Promise<Boolean>>;
    //confirmCreds: EmailPasswordFunc<boolean>; // Takes Creds and Verifies if they are correct or now (Used for Confirmation)
    verifyToken: AccessTokenFunc<Promise<boolean>>; // Verifies if the Access Token is valid
    renewTokens: RenewTokensFunc<Promise<AuthTokens>>; // Renews the Auth Tokens
}
