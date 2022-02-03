import { Group, Header } from "@mantine/core";
import { firebaseAuth } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import HeaderButton from "../buttons/HeaderButton";
import UserMenu from "../menus/UserMenu";

const HeaderBasic: React.FC = (props) => {
    const [user, loading, error] = useAuthState(firebaseAuth);

    return (
        <Header height={80} padding={"md"}>
            <Group
                style={{
                    height: "100%",
                }}
                position="apart"
                grow
            >
                <Group position={"left"} spacing={"md"}>
                    <HeaderButton href="/">Home</HeaderButton>
                    <HeaderButton href="/pricing">Pricing</HeaderButton>
                </Group>
                <img
                    height={"100%"}
                    src={"/IPSentinel_Logo.svg"}
                    alt={"Logo"}
                />
                <Group position={"right"}>
                    {user ? (
                        <>
                            <HeaderButton href="/dashboard">
                                Dashboard
                            </HeaderButton>
                            <UserMenu />
                        </>
                    ) : (
                        <HeaderButton href="/login">
                            Login / Signup
                        </HeaderButton>
                    )}
                </Group>
            </Group>
        </Header>
    );
};

export default HeaderBasic;
