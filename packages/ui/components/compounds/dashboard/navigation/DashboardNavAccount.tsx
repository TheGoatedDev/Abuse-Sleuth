import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
    Menu,
    Stack,
} from "@mantine/core";
import {
    FloatingPlacement,
    FloatingPosition,
} from "@mantine/core/lib/Floating";
import { IconChevronRight } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    user: {
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },
}));

interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
    menuContents: React.ReactNode;
    menuPosition?: FloatingPosition;
}

export function DashboardNavAccount({
    image,
    name,
    email,
    icon,
    menuContents,
    menuPosition,
    ...others
}: UserButtonProps) {
    const { classes } = useStyles();

    return (
        <Menu width={200} position={menuPosition ?? "right"}>
            <Menu.Target>
                <UnstyledButton className={classes.user} {...others}>
                    <Group position="apart">
                        <Group>
                            <Avatar src={image} size={32} radius="sm" />

                            <Stack spacing={0}>
                                <Text size="sm">{name}</Text>

                                <Text color="dimmed" size="xs" lineClamp={1}>
                                    {email}
                                </Text>
                            </Stack>
                        </Group>

                        {icon || <IconChevronRight size={18} stroke={2} />}
                    </Group>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>{menuContents}</Menu.Dropdown>
        </Menu>
    );
}
