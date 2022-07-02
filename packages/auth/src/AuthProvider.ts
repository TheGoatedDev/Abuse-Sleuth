type EmailPasswordFunc<T> = (email: string, password: string) => T;
type AccessTokenFunc<T> = (accessToken: string) => T;
type RefreshTokenFunc<T> = (refreshToken: string) => T;
type CodeFunc<T> = (code: string, email: string) => T;

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export interface AuthProvider {
    registerUser: EmailPasswordFunc<Promise<void>>; // Registers the user and returns if successful
    loginUser: EmailPasswordFunc<Promise<AuthTokens>>; // Login the user and return Auth Tokens
    confirmRegistration: CodeFunc<Promise<Boolean>>;
    //confirmCreds: EmailPasswordFunc<boolean>; // Takes Creds and Verifies if they are correct or now (Used for Confirmation)
    verifyToken: AccessTokenFunc<Promise<boolean>>; // Verifies if the Access Token is valid
    //renewTokens: RefreshTokenFunc<AuthTokens>; // Renews the Auth Tokens
}
