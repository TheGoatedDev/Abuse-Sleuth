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
import { IconPlus } from "@abuse-sleuth/ui/icons";
import { ContextModalProps, openContextModal } from "@abuse-sleuth/ui/modals";
import {
    showErrorNotification,
    showSuccessNotification,
} from "@abuse-sleuth/ui/notifications";
import { zodResolver } from "@abuse-sleuth/ui/shared";

export const TeamCreateModal: FC<ContextModalProps> = ({
    context,
    id,
    innerProps,
}) => {
    const trpcContext = trpcClient.useContext();

    const createTeam = trpcClient.teams.create.useMutation({
        onSuccess(input) {
            showSuccessNotification({
                title: "Team Created!",
                message: `${input.teamName} has been created!`,
            });
            trpcContext.teams.getAllSelf.invalidate();
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
            teamName: "",
        },
        validate: zodResolver(
            z.object({
                teamName: z
                    .string()
                    .min(3, "Team Name must be at least 3 letters"),
            })
        ),
    });

    return (
        <>
            <form
                onSubmit={form.onSubmit((values) => {
                    createTeam.mutate({
                        teamName: values.teamName,
                    });
                })}>
                <Stack>
                    <TextInput
                        label="Team Name"
                        {...form.getInputProps("teamName")}
                    />
                    <Button loading={createTeam.isLoading} type="submit">
                        Create
                    </Button>
                </Stack>
            </form>
        </>
    );
};

export const openTeamCreateModal = () =>
    openContextModal({
        modal: "teamCreate",
        title: (
            <Group>
                <Icon
                    icon={<IconPlus stroke={3.5} size={28} />}
                    color={"green"}
                />
                <Text weight={"bold"} size={"lg"}>
                    Create Team
                </Text>
            </Group>
        ),
        innerProps: {},
    });

export default TeamCreateModal;
