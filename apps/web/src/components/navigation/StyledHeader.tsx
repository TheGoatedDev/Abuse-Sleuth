import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { NavLink } from "@abuse-sleuth/ui";
import { Group, Space } from "@abuse-sleuth/ui/components";

const StyledHeader: React.FC = (props) => {
    const { status } = useSession();

    return (
        <Group position="right" spacing="xl" px="md" mt="sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <Space h="xl" />
            <NavLink
                href={
                    status == "authenticated"
                        ? "/dashboard"
                        : "/api/auth/signin/google"
                }>
                {status == "authenticated" ? "Dashboard" : "Login / Signup"}
            </NavLink>
        </Group>
    );
};

export default StyledHeader;
