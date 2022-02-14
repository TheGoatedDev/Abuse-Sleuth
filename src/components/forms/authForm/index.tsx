import { EnvelopeIcon, UserIcon, UserPlusIcon } from "@icons";
import { Tabs } from "@mantine/core";
import LoginAuthForm from "./loginAuthForm";
import ResetPasswordAuthForm from "./resetPasswordAuthForm";
import SignupAuthForm from "./signupAuthForm";

const AuthForm: React.FC = () => {
    return (
        <Tabs position="center" style={{ width: "350px" }}>
            <Tabs.Tab label="Login" icon={<UserIcon />} color={"teal"}>
                <LoginAuthForm />
            </Tabs.Tab>
            <Tabs.Tab label="Sign up" icon={<UserPlusIcon />} color={"blue"}>
                <SignupAuthForm />
            </Tabs.Tab>
            <Tabs.Tab
                label="Reset Password"
                icon={<EnvelopeIcon />}
                color={"red"}
            >
                <ResetPasswordAuthForm />
            </Tabs.Tab>
        </Tabs>
    );
};

export default AuthForm;
