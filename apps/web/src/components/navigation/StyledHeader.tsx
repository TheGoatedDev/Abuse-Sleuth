import { useAuth } from "@contexts/authContext";

import { Group, NavLink, Space } from "@abuse-sleuth/ui";

const StyledHeader: React.FC = (props) => {
    const authencation = useAuth();

    return (
        <Group position="right" spacing="xl" px="md" mt="sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <Space h="xl" />
            <NavLink href={authencation.user ? "/dashboard" : "/login"}>
                {authencation.user ? "Dashboard" : "Login / Signup"}
            </NavLink>
        </Group>
    );
};

export default StyledHeader;
