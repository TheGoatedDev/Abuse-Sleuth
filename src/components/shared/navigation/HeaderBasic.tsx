import { Group, Header, Text } from "@mantine/core";
import { supabaseClient } from "@services/supabase/supabaseClient";
import Link from "next/link";
import HeaderButton from "../buttons/HeaderButton";
import UserMenu from "../menus/userMenu";

const HeaderBasic: React.FC = (props) => {
    const user = supabaseClient.auth.user();

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
                            <HeaderButton href="/login">Dashboard</HeaderButton>
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
