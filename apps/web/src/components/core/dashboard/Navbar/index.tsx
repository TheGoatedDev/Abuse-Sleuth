import Image from "next/image";
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
} from "@abuse-sleuth/ui/components/atoms";
import {
    DashboardNavButton,
    DashboardNavLink,
    DashboardNavTeamButton,
} from "@abuse-sleuth/ui/components/compounds";
import { useLocalStorage } from "@abuse-sleuth/ui/hooks";
import {
    IconDashboard,
    IconFileDescription,
    IconFilePlus,
    IconLogout,
    IconUser,
} from "@abuse-sleuth/ui/icons";

const Navbar: React.FC = () => {
    const { data: session } = useSession();

    const teamGetSelfQuery = trpcClient.teams.getSelf.useQuery();
    const userSetActiveTeamMutation =
        trpcClient.users.setActiveTeam.useMutation();

    return (
        <MantineNavbar width={{ base: 250 }}>
            <MantineNavbar.Section mt="xs">
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
            </MantineNavbar.Section>
            <MantineNavbar.Section grow px={"xs"} mt="xs">
                <Stack spacing={4}>
                    <DashboardNavLink
                        href="/dashboard"
                        label="Home"
                        color={"blue"}
                        icon={<IconDashboard />}
                    />

                    <DashboardNavLink
                        href="/report/new"
                        label="New Report"
                        color={"green"}
                        icon={<IconFilePlus />}
                    />

                    <DashboardNavLink
                        href="/report/view"
                        label="View Reports"
                        color={"violet"}
                        icon={<IconFileDescription />}
                    />
                </Stack>
            </MantineNavbar.Section>

            <MantineNavbar.Section px={"xs"} mb={"xs"}>
                <Stack spacing={4}>
                    <DashboardNavTeamButton
                        teams={teamGetSelfQuery.data ?? []}
                        session={session}
                        setActiveTeam={(teamId) => {
                            userSetActiveTeamMutation.mutate({ teamId });
                        }}
                    />

                    <DashboardNavLink
                        href="/account"
                        label={session?.user?.name ?? ""}
                        color={"blue"}
                        icon={<IconUser />}
                    />
                    <DashboardNavButton
                        onClick={() => {
                            signOut();
                        }}
                        label={"Logout"}
                        color={"red"}
                        icon={<IconLogout />}
                    />
                </Stack>
            </MantineNavbar.Section>
        </MantineNavbar>
    );
};

export default Navbar;
