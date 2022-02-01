import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs } from "@mantine/core";
import LoginAuthForm from "./loginAuthForm";
import SignupAuthForm from "./signupAuthForm";

const AuthForm: React.FC = () => {
    return (
        <Tabs position="center" style={{ width: "250px" }}>
            <Tabs.Tab
                label="Login"
                icon={<FontAwesomeIcon icon={faUser} />}
                color={"teal"}
            >
                <LoginAuthForm />
            </Tabs.Tab>
            <Tabs.Tab
                label="Sign up"
                icon={<FontAwesomeIcon icon={faUserPlus} />}
                color={"blue"}
            >
                <SignupAuthForm />
            </Tabs.Tab>
        </Tabs>
    );
};

export default AuthForm;
