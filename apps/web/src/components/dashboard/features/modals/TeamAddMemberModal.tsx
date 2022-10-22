import { FC } from "react";
import { z } from "zod";

import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button,
    Group,
    Icon,
    Stack,
    Text,
    TextInput,
} from "@abuse-sleuth/ui/components/atoms";
import { useForm } from "@abuse-sleuth/ui/hooks";
import { IconUserPlus } from "@abuse-sleuth/ui/icons";
import { ContextModalProps, openContextModal } from "@abuse-sleuth/ui/modals";
import {
    showErrorNotification,
    showSuccessNotification,
} from "@abuse-sleuth/ui/notifications";
import { zodResolver } from "@abuse-sleuth/ui/shared";

type TeamAddMemberModalInnerProps = { teamId: string };

export const TeamAddMemberModal: FC<
    ContextModalProps<TeamAddMemberModalInnerProps>
> = ({ context, id, innerProps }) => {
    const { teamId } = innerProps;

    const trpcContext = trpcClient.useContext();

    const editTeam = trpcClient.teams.members.addMember.useMutation({
        onSuccess(data) {
            showSuccessNotification({
                title: "Team Member Added!",
                message: `${data.user.email} added to the Team.`,
            });
            trpcContext.teams.members.getMembers.invalidate({ teamId });
            context.closeModal(id);
        },
        onError(error) {
            showErrorNotification({
                title: "Error Occurred!",
                message: error.message,
            });
        },
    });

    const form = useForm({
        initialValues: {
            teamId: teamId,
            userEmail: "",
        },
        validate: zodResolver(
            z.object({
                userEmail: z.string().email(),
            })
        ),
    });

    return (
        <>
            <form
                onSubmit={form.onSubmit((values) => {
                    editTeam.mutate({
                        teamId: values.teamId,
                        userEmail: values.userEmail,
                    });
                })}>
                <Stack>
                    <TextInput
                        label="Email"
                        {...form.getInputProps("userEmail")}
                    />
                    <Button loading={editTeam.isLoading} type="submit">
                        Add
                    </Button>
                </Stack>
            </form>
        </>
    );
};

export const openTeamAddMemberModal = (props: TeamAddMemberModalInnerProps) =>
    openContextModal({
        modal: "teamAddMember",
        title: (
            <Group>
                <Icon
                    icon={<IconUserPlus stroke={2.5} size={28} />}
                    color={"violet"}
                />
                <Text weight={"bold"} size={"lg"}>
                    Add Member
                </Text>
            </Group>
        ),
        innerProps: props,
    });

export default TeamAddMemberModal;
