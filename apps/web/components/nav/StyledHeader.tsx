import Link from "next/link";

import { AppShell, Box, Button, Group, NavLink, Space } from "@abuse-sleuth/ui";

import { useAuth } from "../../hooks/AuthHook";

const StyledHeader: React.FC = (props) => {
    const auth = useAuth();

    return (
        <Group position="right" spacing="xl" px="md" mt="sm">
            <NavLink color={"#FFFFFF"} href="/">
                Home
            </NavLink>
            <NavLink color={"#FFFFFF"} href="/pricing">
                Pricing
            </NavLink>
            <Space h="xl" />
            <NavLink
                color={"#FFFFFF"}
                href={auth.user ? "/dashboard" : "/login"}>
                {auth.user ? "Dashboard" : "Login / Signup"}
            </NavLink>
        </Group>
    );
};

export default StyledHeader;
