import { useAuth } from "@contexts/AuthProvider";
import { Group, Header } from "@mantine/core";
import HeaderButton from "../buttons/HeaderButton";
import UserMenu from "../menus/userMenu";

const HeaderBasic: React.FC = (_props) => {
    const { user } = useAuth();

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
