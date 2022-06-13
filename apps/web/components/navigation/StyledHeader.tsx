import { Group, NavLink, Space } from "@abuse-sleuth/ui";

const StyledHeader: React.FC = (props) => {

    return (
        <Group position="right" spacing="xl" px="md" mt="sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <Space h="xl" />
            <NavLink href={false ? "/dashboard" : "/login"}>
                {false ? "Dashboard" : "Login / Signup"}
            </NavLink>
        </Group>
    );
};

export default StyledHeader;
