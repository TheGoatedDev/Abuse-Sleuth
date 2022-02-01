import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs } from "@mantine/core";

const AuthForm: React.FC = () => {
    return (
        <Tabs>
            <Tabs.Tab
                label="Login"
                icon={<FontAwesomeIcon icon={faUser} />}
                color={"teal"}
            ></Tabs.Tab>
            <Tabs.Tab
                label="Sign up"
                icon={<FontAwesomeIcon icon={faUserPlus} />}
                color={"blue"}
            ></Tabs.Tab>
        </Tabs>
    );
};

export default AuthForm;
