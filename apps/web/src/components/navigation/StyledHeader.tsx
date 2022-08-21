import { useUser } from "@abuse-sleuth/authentication/nextjs";
import { NavLink } from "@abuse-sleuth/ui";
import { Group, Space } from "@abuse-sleuth/ui/mantine";

const StyledHeader: React.FC = (props) => {
    const { user } = useUser();

    return (
        <Group position="right" spacing="xl" px="md" mt="sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <Space h="xl" />
            <NavLink href={user ? "/dashboard" : "/api/auth/login"}>
                {user ? "Dashboard" : "Login / Signup"}
            </NavLink>
        </Group>
    );
};

export default StyledHeader;
