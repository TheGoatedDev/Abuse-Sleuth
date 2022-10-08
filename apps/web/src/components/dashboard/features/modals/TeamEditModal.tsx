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
import { IconCheck, IconEdit, IconX } from "@abuse-sleuth/ui/icons";
import { ContextModalProps, openContextModal } from "@abuse-sleuth/ui/modals";
import { showNotification } from "@abuse-sleuth/ui/notifications";
import { zodResolver } from "@abuse-sleuth/ui/shared";

type TeamEditModalInnerProps = { teamId: string };

export const TeamEditModal: FC<ContextModalProps<TeamEditModalInnerProps>> = ({
    context,
    id,
    innerProps,
}) => {
    const { teamId } = innerProps;

    const trpcContext = trpcClient.useContext();

    const editTeam = trpcClient.teams.edit.useMutation({
        onSuccess() {
            showNotification({
                title: "Team Edited!",
                message: `Team has been editted!`,
                color: "green",
                icon: <IconCheck />,
            });
            trpcContext.teams.get.invalidate({ teamId });
            trpcContext.teams.getAllSelf.invalidate();
            trpcContext.users.getActiveTeamSelf.invalidate();
            context.closeModal(id);
        },
        onError(error) {
            showNotification({
                title: "Error Occurred!",
                message: error.message,
                color: "red",
                icon: <IconX />,
            });
        },
    });

    const form = useForm({
        initialValues: {
            teamId: teamId,
            teamName: "",
        },
        validate: zodResolver(
            z.object({
                teamName: z.string(),
            })
        ),
    });

    return (
        <>
            <form
                onSubmit={form.onSubmit((values) => {
                    editTeam.mutate({
                        teamId: values.teamId,
                        data: {
                            teamName: values.teamName,
                        },
                    });
                })}>
                <Stack>
                    <TextInput
                        label="Team Name"
                        {...form.getInputProps("teamName")}
                    />
                    <Button loading={editTeam.isLoading} type="submit">
                        Edit
                    </Button>
                </Stack>
            </form>
        </>
    );
};

export const openTeamEditModal = (props: TeamEditModalInnerProps) =>
    openContextModal({
        modal: "teamEdit",
        title: (
            <Group>
                <Icon
                    icon={<IconEdit stroke={2.5} size={28} />}
                    color={"violet"}
                />
                <Text weight={"bold"} size={"lg"}>
                    Edit Team
                </Text>
            </Group>
        ),
        innerProps: props,
    });

export default TeamEditModal;
