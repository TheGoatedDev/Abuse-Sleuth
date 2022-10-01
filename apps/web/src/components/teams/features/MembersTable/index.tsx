import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { ActionIcon, Group, Table } from "@abuse-sleuth/ui/components/atoms";
import { IconArrowDown, IconArrowUp, IconX } from "@abuse-sleuth/ui/icons";
import { openConfirmationModal } from "@abuse-sleuth/ui/modals";
import { FCC } from "@abuse-sleuth/ui/types";

type MembersTableProps = {
    teamId: string;
};

export const MembersTable: FCC<MembersTableProps> = ({ teamId }) => {
    const trpcContext = trpcClient.useContext();

    const getTeamMembersQuery = trpcClient.teams.members.getMembers.useQuery({
        teamId,
    });

    const removeTeamMember = trpcClient.teams.members.removeMember.useMutation({
        onSuccess() {
            trpcContext.teams.members.getMembers.invalidate({
                teamId,
            });
        },
    });

    const promoteTeamMember =
        trpcClient.teams.members.promoteMember.useMutation({
            onSuccess() {
                trpcContext.teams.members.getMembers.invalidate({
                    teamId,
                });
            },
        });

    const demoteTeamMember = trpcClient.teams.members.demoteMember.useMutation({
        onSuccess() {
            trpcContext.teams.members.getMembers.invalidate({
                teamId,
            });
        },
    });

    return (
        <Table striped highlightOnHover>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {getTeamMembersQuery.data?.map((x, i) => (
                    <tr key={i}>
                        <td>{x.user.name}</td>
                        <td>{x.role}</td>
                        <td>
                            <Group>
                                {x.role === "USER" && (
                                    <ActionIcon
                                        color={"teal"}
                                        variant="light"
                                        onClick={() =>
                                            openConfirmationModal({
                                                actionDescription: `You are about to Promote ${x.user.name} to a Manager`,
                                                onConfirm: () =>
                                                    promoteTeamMember.mutate({
                                                        teamId,
                                                        userEmail: x.user.email,
                                                    }),
                                            })
                                        }>
                                        <IconArrowUp />
                                    </ActionIcon>
                                )}
                                {x.role === "MANAGER" && (
                                    <ActionIcon
                                        color={"red"}
                                        variant="light"
                                        onClick={() =>
                                            openConfirmationModal({
                                                actionDescription: `You are about to Demote ${x.user.name} to a User`,
                                                onConfirm: () =>
                                                    demoteTeamMember.mutate({
                                                        teamId,
                                                        userEmail: x.user.email,
                                                    }),
                                            })
                                        }>
                                        <IconArrowDown />
                                    </ActionIcon>
                                )}
                                {x.role !== "OWNER" && (
                                    <ActionIcon
                                        color={"red"}
                                        variant="light"
                                        onClick={() =>
                                            openConfirmationModal({
                                                actionDescription: `You are about to Remove ${x.user.name} from the Team`,
                                                onConfirm: () =>
                                                    removeTeamMember.mutate({
                                                        teamId,
                                                        userEmail: x.user.email,
                                                    }),
                                            })
                                        }>
                                        <IconX />
                                    </ActionIcon>
                                )}
                            </Group>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default MembersTable;
