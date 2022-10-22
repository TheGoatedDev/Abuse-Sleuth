import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button,
    Divider,
    Group,
    Icon,
    Loader,
    Skeleton,
    Space,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import {
    IconEdit,
    IconExclamationMark,
    IconPigMoney,
    IconPlus,
} from "@abuse-sleuth/ui/icons";
import { openConfirmationModal } from "@abuse-sleuth/ui/modals";
import {
    showSuccessNotification,
    trpcErrorNotification,
} from "@abuse-sleuth/ui/notifications";

import { openTeamAddMemberModal } from "@components/dashboard/features/modals/TeamAddMemberModal";
import { openTeamEditModal } from "@components/dashboard/features/modals/TeamEditModal";
import { Layout } from "@components/dashboard/layouts";
import MembersTable from "@components/teams/features/MembersTable";
import ReportsTable from "@components/teams/features/ReportsTable";
import Routes from "@utils/routes";

const TeamViewSingle: NextPage = () => {
    const router = useRouter();
    const teamId = router.query.teamid as string;

    const trpcContext = trpcClient.useContext();

    const getTeamQuery = trpcClient.teams.get.useQuery({
        teamId,
    });

    const getTeamMembersQuery = trpcClient.teams.members.getMembers.useQuery({
        teamId,
    });

    const getSelfRole = trpcClient.teams.members.getSelf.useQuery({
        teamId,
    });

    const deleteTeam = trpcClient.teams.delete.useMutation({
        onSuccess: () => {
            router.push(Routes.dashboard.home);
            trpcContext.teams.getAllSelf.invalidate();
            showSuccessNotification({
                message: `Team is now Deleted.`,
            });
        },
        onError: (error) => {
            trpcErrorNotification(error.message);
        },
    });

    //  TODO: Improve this, Make it Centralised
    if (
        getTeamQuery.isLoading ||
        getTeamMembersQuery.isLoading ||
        getSelfRole.isLoading
    ) {
        return (
            <Layout>
                <Group
                    position="center"
                    sx={() => ({
                        height: "100vh",
                    })}>
                    <Loader size={"xl"} color="violet" />
                </Group>
            </Layout>
        );
    }

    // TODO: Improve this, Make it Centralised
    if (
        getTeamQuery.isError ||
        !getTeamQuery.data ||
        getTeamMembersQuery.isError ||
        !getTeamMembersQuery.data ||
        getSelfRole.isError ||
        !getSelfRole.data
    ) {
        return (
            <Layout>
                <Group
                    position="center"
                    sx={() => ({
                        height: "100vh",
                    })}>
                    <Stack spacing={"xs"} align={"center"}>
                        <Icon
                            icon={<IconExclamationMark />}
                            color={"red"}
                            size={56}
                            stroke={3}
                        />
                        <Title>Error has Occurred</Title>
                        <Text>
                            Error:{" "}
                            {getTeamQuery.error?.message ||
                                getTeamMembersQuery.error?.message ||
                                getSelfRole.error?.message}
                        </Text>
                        <Text color={"dimmed"} size="xs">
                            Check the Console, if you are tech-savvy...
                        </Text>
                    </Stack>
                </Group>
            </Layout>
        );
    }

    return (
        <Layout>
            <Group position="apart">
                <Title>
                    {getTeamQuery.data.teamName ?? <Skeleton width={45} />}
                </Title>
                <Group>
                    <Button
                        color="violet"
                        variant="light"
                        leftIcon={<IconEdit size={"16px"} />}
                        disabled={!getTeamQuery.data.canEditTeam}
                        onClick={() => openTeamEditModal({ teamId })}>
                        Edit
                    </Button>
                    {getSelfRole.data.role === "OWNER" && (
                        <Button
                            color="cyan"
                            leftIcon={<IconPigMoney size={"16px"} />}
                            disabled={!getTeamQuery.data.canBillingTeam}
                            onClick={() =>
                                router.push(Routes.team.billing(teamId))
                            }>
                            Billing
                        </Button>
                    )}
                </Group>
            </Group>
            <Divider my="md" />
            <Stack spacing={"xs"}>
                <Group position="apart">
                    <Title>Members</Title>

                    <Button
                        color="green"
                        leftIcon={<IconPlus size={16} />}
                        disabled={!getTeamQuery.data.canAddMember}
                        onClick={() => openTeamAddMemberModal({ teamId })}>
                        Add User
                    </Button>
                </Group>
                <MembersTable teamId={teamId} />
                <Space h={"xl"} />
                <Title>Reports</Title>
                <ReportsTable teamId={teamId} />

                {getSelfRole.data.role === "OWNER" && (
                    <Stack align={"center"}>
                        <Title order={3}>Deleting Team</Title>
                        <Group>
                            <Button
                                color={"red"}
                                leftIcon={<IconExclamationMark />}
                                disabled={!getTeamQuery.data.canDeleteTeam}
                                onClick={() =>
                                    openConfirmationModal({
                                        actionDescription: `You are about to delete ${getTeamQuery.data.teamName}`,
                                        onConfirm: () => {
                                            deleteTeam.mutate({ teamId });
                                        },
                                    })
                                }>
                                Delete This Team
                            </Button>
                        </Group>
                    </Stack>
                )}
            </Stack>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamViewSingle;
