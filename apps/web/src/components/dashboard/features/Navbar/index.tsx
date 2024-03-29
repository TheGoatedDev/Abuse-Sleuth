import Link from "next/link";

import {
    Center,
    Divider,
    Image,
    Navbar as MantineNavbar,
    Stack,
} from "@abuse-sleuth/ui/components/atoms";
import { DashboardNavLink } from "@abuse-sleuth/ui/components/compounds";
import {
    IconDashboard,
    IconFileDescription,
    IconFilePlus,
} from "@abuse-sleuth/ui/icons";

import Routes from "@utils/routes";

import { NavAccount } from "./NavAccount";
import { NavTeamSelector } from "./NavTeamSelector";

const Navbar: React.FC = () => {
    return (
        <MantineNavbar width={{ base: 300 }}>
            <MantineNavbar.Section mt="xs">
                <Center>
                    <Link href={Routes.home}>
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
                        href={Routes.dashboard.home}
                        label="Home"
                        color={"blue"}
                        icon={<IconDashboard />}
                    />

                    <DashboardNavLink
                        href={Routes.report.create}
                        label="New Report"
                        color={"green"}
                        icon={<IconFilePlus />}
                    />

                    <DashboardNavLink
                        href={Routes.report.viewAll}
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
