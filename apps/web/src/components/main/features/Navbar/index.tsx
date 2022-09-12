import Link from "next/link";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { Group, Space, Text, Image } from "@abuse-sleuth/ui/components/atoms";
import { NavLink } from "@abuse-sleuth/ui/components/molecules";

const StyledHeader: React.FC = (props) => {
    const { status } = useSession();

    return (
        <Group position="apart" px="md" py="sm">
            <Link href={"/"}>
                <Image
                    height={"40px"}
                    width={"40px"}
                    src="/logo.svg"
                    alt="Abuse Sleuth Logo"
                />
            </Link>
            <Group position="right" spacing="xl">
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
        </Group>
    );
};

export default StyledHeader;
