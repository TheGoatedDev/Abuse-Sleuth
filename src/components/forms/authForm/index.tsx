import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs } from "@mantine/core";
import LoginAuthForm from "./loginAuthForm";
import ResetPasswordAuthForm from "./resetPasswordAuthForm";
import SignupAuthForm from "./signupAuthForm";

const AuthForm: React.FC = () => {
    return (
        <Tabs position="center" style={{ width: "350px" }}>
            <Tabs.Tab
                label="Login"
                icon={<FontAwesomeIcon icon={"user"} />}
                color={"teal"}
            >
                <LoginAuthForm />
            </Tabs.Tab>
            <Tabs.Tab
                label="Sign up"
                icon={<FontAwesomeIcon icon={"user-plus"} />}
                color={"blue"}
            >
                <SignupAuthForm />
            </Tabs.Tab>
            <Tabs.Tab
                label="Reset Password"
                icon={<FontAwesomeIcon icon={"envelope"} />}
                color={"red"}
            >
                <ResetPasswordAuthForm />
            </Tabs.Tab>
        </Tabs>
    );
};

export default AuthForm;
