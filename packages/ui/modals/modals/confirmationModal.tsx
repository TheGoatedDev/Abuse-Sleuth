import { Group, Stack, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconCheckbox } from "@tabler/icons";

import { Icon } from "../../components/atoms";

type openConfirmationModalProps = {
    actionDescription: string;
    onConfirm?: () => any;
    onCancel?: () => any;
};

export const openConfirmationModal = ({
    actionDescription,
    onCancel,
    onConfirm,
}: openConfirmationModalProps) =>
    openConfirmModal({
        title: (
            <Group>
                <Icon size={26} icon={<IconCheckbox />} color={"violet"}></Icon>
                <Text align="end" weight={"bold"}>
                    Please confirm your action
                </Text>
            </Group>
        ),

        children: (
            <Stack>
                <Text>
                    Confirm that you are about to perform the action below:
                </Text>
                <Text color={"dimmed"}>&apos;{actionDescription}&apos;</Text>
            </Stack>
        ),
        centered: true,
        labels: { cancel: "Cancel", confirm: "Confirm" },
        onCancel,
        onConfirm,
    });

export default openConfirmationModal;
