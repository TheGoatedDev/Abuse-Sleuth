import {
    Group,
    MantineColor,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import { IconArrowRight, IconUsers } from "@tabler/icons";

export const DashboardNavbarTeamButton: React.FC<{}> = (props) => {
    return (
        <UnstyledButton
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,

                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.black,

                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0],
                },
            })}>
            <Group position="apart">
                <Group>
                    <ThemeIcon size={"lg"} color={"cyan"} variant="light">
                        <IconUsers />
                    </ThemeIcon>
                    <Text size="sm">TEAM NAME</Text>
                </Group>
                <IconArrowRight />
            </Group>
        </UnstyledButton>
    );
};
