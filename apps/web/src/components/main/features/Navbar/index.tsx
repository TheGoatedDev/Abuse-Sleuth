import Link from "next/link";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { Group, Space, Text, Image } from "@abuse-sleuth/ui/components/atoms";
import { NavLink } from "@abuse-sleuth/ui/components/molecules";
import routes from "@utils/routes";

const StyledHeader: React.FC = (props) => {
    const { status } = useSession();

    return (
        <Group position="apart" px="md" py="sm">
            <Link href={routes.home}>
                <Image
                    height={"40px"}
                    width={"40px"}
                    src="/logo.svg"
                    alt="Abuse Sleuth Logo"
                />
            </Link>
            <Group position="right" spacing="xl">
                <NavLink href={routes.pricing} color="#FFF">
                    Pricing
                </NavLink>
                <Space h="xl" />
                {status === "authenticated" ? (
                    <NavLink href={routes.dashboard.home} color="#FFF">
                        Dashboard
                    </NavLink>
                ) : (
                    <NavLink href={routes.auth.login} color="#FFF">
                        Login / Signup
                    </NavLink>
                )}
            </Group>
        </Group>
    );
};

export default StyledHeader;
