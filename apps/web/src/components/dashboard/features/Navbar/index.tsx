import { NextLink } from "@mantine/next";
import Link from "next/link";

import {
    signOut,
    useSession,
} from "@abuse-sleuth/authentication/nextjs/client";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Center,
    Navbar as MantineNavbar,
    Stack,
    Image,
    Menu,
    Divider,
    Group,
} from "@abuse-sleuth/ui/components/atoms";
import {
    DashboardNavAccount,
    DashboardNavButton,
    DashboardNavLink,
    DashboardNavTeamButton,
} from "@abuse-sleuth/ui/components/compounds";
import { ThemeSwitcher } from "@abuse-sleuth/ui/components/molecules/";
import { useLocalStorage } from "@abuse-sleuth/ui/hooks";
import {
    IconDashboard,
    IconFileDescription,
    IconFilePlus,
    IconLogout,
    IconUser,
} from "@abuse-sleuth/ui/icons";

import { NavAccount } from "./NavAccount";
import { NavTeamSelector } from "./NavTeamSelector";
import routes from "@utils/routes";

const Navbar: React.FC = () => {
    return (
        <MantineNavbar width={{ base: 250 }}>
            <MantineNavbar.Section mt="xs">
                <Center>
                    <Link href={routes.home}>
                        <Image
                            src="/logo.svg"
                            width={"45px"}
                            height={"60px"}
                            alt="Abuse Sleuth Logo"
                        />
                    </Link>
                </Center>
            </MantineNavbar.Section>
            <MantineNavbar.Section grow px={"xs"} mt="xs">
                <Stack spacing={4}>
                    <DashboardNavLink
                        href={routes.dashboard.home}
                        label="Home"
                        color={"blue"}
                        icon={<IconDashboard />}
                    />

                    <DashboardNavLink
                        href={routes.report.createNewReport}
                        label="New Report"
                        color={"green"}
                        icon={<IconFilePlus />}
                    />

                    <DashboardNavLink
                        href={routes.report.viewAllReports}
                        label="View Reports"
                        color={"violet"}
                        icon={<IconFileDescription />}
                    />
                </Stack>
            </MantineNavbar.Section>
            <Divider my="sm" />
            <MantineNavbar.Section px={"xs"} mb={"xs"}>
                <Stack spacing={4}>
                    <NavTeamSelector />
                    <NavAccount />
                </Stack>
            </MantineNavbar.Section>
        </MantineNavbar>
    );
};

export default Navbar;
