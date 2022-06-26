import {
    CognitoUserAttribute,
    CognitoUserPool,
    ICognitoUserPoolData,
} from "amazon-cognito-identity-js";
import dotENV from "dotenv";
import path from "path";

const ENVPATH = path.resolve(__dirname, "../../../", ".env");
const env = dotENV.config({ path: ENVPATH });

const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env["API_USER_POOL_ID"] ?? "",
    ClientId: process.env["API_USER_POOL_CLIENT_ID"] ?? "",
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
