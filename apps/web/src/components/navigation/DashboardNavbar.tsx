import Image from "next/image";
import Link from "next/link";

import {
    signOut,
    useSession,
} from "@abuse-sleuth/authentication/nextjs/client";
import {
    DashboardNavbarButton,
    DashboardNavbarLink,
    DashboardNavbarTeamButton,
} from "@abuse-sleuth/ui/components/compounds";
import { Center, Navbar, Stack } from "@abuse-sleuth/ui/components/atoms";
import {
    IconDashboard,
    IconFileDescription,
    IconFilePlus,
    IconLogout,
    IconUser,
} from "@abuse-sleuth/ui/icons";

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
                <Stack spacing={4}>
                    <DashboardNavbarLink
                        href="/dashboard"
                        label="Home"
                        color={"blue"}
                        icon={<IconDashboard />}
                    />

                    <DashboardNavbarLink
                        href="/report/new"
                        label="New Report"
                        color={"green"}
                        icon={<IconFilePlus />}
                    />

                    <DashboardNavbarLink
                        href="/report/view"
                        label="View Reports"
                        color={"violet"}
                        icon={<IconFileDescription />}
                    />
                </Stack>
            </Navbar.Section>

            <Navbar.Section px={"xs"} mb={"xs"}>
                <Stack spacing={4}>
                    <DashboardNavbarTeamButton />

                    <DashboardNavbarLink
                        href="/account"
                        label={session?.user?.name ?? ""}
                        color={"blue"}
                        icon={<IconUser />}
                    />
                    <DashboardNavbarButton
                        onClick={() => {
                            signOut();
                        }}
                        label={"Logout"}
                        color={"red"}
                        icon={<IconLogout />}
                    />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
};

export default DashboardNavbar;
