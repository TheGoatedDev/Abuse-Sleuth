import { AuthProvider, AuthTokens } from "AuthProvider";
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
    ICognitoUserPoolData,
} from "amazon-cognito-identity-js";
import dotENV from "dotenv";
import jwt from "jsonwebtoken";
import jwtToPem from "jwk-to-pem";
import path from "path";

const ENVPATH = path.resolve(__dirname, "../../../", ".env");
const env = dotENV.config({ path: ENVPATH });

const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env["AUTH_USER_POOL_ID"] ?? "",
    ClientId: process.env["AUTH_USER_POOL_CLIENT_ID"] ?? "",
};

const userPool = new CognitoUserPool(poolData);

export const registerUser = async (
    email: string,
    password: string
): Promise<string> => {
    return new Promise((success, reject) => {
        const attributeList = [];
        attributeList.push(
            new CognitoUserAttribute({ Name: "email", Value: email })
        );

        userPool.signUp(email, password, attributeList, [], (err, result) => {
            if (err) {
                return reject(err);
                throw err;
            }
            return success(result?.user.getUsername() ?? "");
        });
    });
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthTokens> => {
    return new Promise((success, reject) => {
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (results) => {
                return success({
                    accessToken: results.getAccessToken().getJwtToken(),
                    refreshToken: results.getRefreshToken().getToken(),
                });
            },
            onFailure: (err) => {
                return reject(err);
            },
        });
    });
};

const verifyToken = async (accessToken: string): Promise<boolean> => {
    // TODO: Add ENV for Region.
    const res = await fetch(
        `https://cognito-idp.${"eu-west-2"}.amazonaws.com/${userPool.getUserPoolId()}/.well-known/jwks.json`
    );

    const json = (await res.json()) as { keys: Array<any> };

    let pems: any = {};
    for (let i = 0; i <= json["keys"].length - 1; i++) {
        const key = json["keys"][i];
        console.log(`Key #${i}: ` + key.kid);
        const keyID = key.kid ?? "-";
        const mod = key.n;
        const expo = key.e;
        const type = key.kty;
        const jwk = { kty: type, n: mod, e: expo };
        console.log(`JWK #${i}: ` + jwk);
        pems[keyID] = jwtToPem(jwk);
    }

    console.log("OOF");

    const decoded = jwt.decode(accessToken, { complete: true });
    if (!decoded) {
        return false;
    }

    console.log(decoded);

    const kid = decoded.header.kid ?? "";
    const pem = pems[kid];
    if (!pem) {
        return false;
    }

    const verification = await jwt.verify(accessToken, pem, {
        algorithms: ["RS256"],
    });
    if (verification) {
        return true;
    }

    return false;
};

export const awsCognitoAuth: AuthProvider = {
    registerUser,
    loginUser,
    verifyToken,
};
