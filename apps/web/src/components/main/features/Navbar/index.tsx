import Link from "next/link";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { Group, Image, Space } from "@abuse-sleuth/ui/components/atoms";
import { NavLink } from "@abuse-sleuth/ui/components/molecules";

import Routes from "@utils/routes";

const StyledHeader: React.FC = (props) => {
    const { status } = useSession();

    return (
        <Group position="apart" px="md" py="sm">
            <Link href={Routes.home}>
                <Image
                    height={"40px"}
                    width={"40px"}
                    src="/logo.svg"
                    alt="Abuse Sleuth Logo"
                />
            </Link>
            <Group position="right" spacing="xl">
                <NavLink href={Routes.pricing} color="#FFF">
                    Pricing
                </NavLink>
                <Space h="xl" />
                {status === "authenticated" ? (
                    <NavLink href={Routes.dashboard.home} color="#FFF">
                        Dashboard
                    </NavLink>
                ) : (
                    <NavLink href={Routes.auth.login} color="#FFF">
                        Login / Signup
                    </NavLink>
                )}
            </Group>
        </Group>
    );
};

export default StyledHeader;
