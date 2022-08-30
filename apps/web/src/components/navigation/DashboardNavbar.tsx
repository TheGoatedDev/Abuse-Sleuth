import Image from "next/image";
import Link from "next/link";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import {
    DashboardNavbarButton,
    DashboardNavbarTeamButton,
} from "@abuse-sleuth/ui";
import {
    IconDashboard,
    IconFileDescription,
    IconFilePlus,
    IconUser,
    IconUsers,
} from "@abuse-sleuth/ui/icons";
import { Center, Navbar } from "@abuse-sleuth/ui/mantine";

const DashboardNavbar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <Navbar width={{ base: 250 }}>
            <Navbar.Section mt="xs">
                <Center>
                    <Link href={"/"}>
                        <Image
                            src="/logo.svg"
                            layout="fixed"
                            width={"45px"}
                            height={"60px"}
                            alt="Abuse Sleuth Logo"
                        />
                    </Link>
                </Center>
            </Navbar.Section>
            <Navbar.Section grow px={"xs"} mt="xs">
                <DashboardNavbarButton
                    href="/dashboard"
                    label="Home"
                    color={"blue"}
                    icon={<IconDashboard />}
                />

                <DashboardNavbarButton
                    href="/report/new"
                    label="New Report"
                    color={"green"}
                    icon={<IconFilePlus />}
                />

                <DashboardNavbarButton
                    href="/report/view"
                    label="View Reports"
                    color={"violet"}
                    icon={<IconFileDescription />}
                />
            </Navbar.Section>

            <Navbar.Section px={"xs"} mb={"xs"}>
                <DashboardNavbarTeamButton />
                <DashboardNavbarButton
                    href="/account"
                    label={session?.user?.name ?? ""}
                    color={"blue"}
                    icon={<IconUser />}
                />
            </Navbar.Section>
        </Navbar>
    );
};

export default DashboardNavbar;
