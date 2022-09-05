import {
    Group,
    MantineColor,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export const DashboardNavButton: React.FC<{
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    color?: MantineColor;
    label: string;
    icon?: JSX.Element;
}> = (props) => {
    return (
        <UnstyledButton
            onClick={props.onClick}
            component="a"
            sx={(theme) => ({
                display: "block",
                //width: "100%",
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
            <Group>
                {props.icon && (
                    <ThemeIcon
                        size={"lg"}
                        color={props.color ?? "blue"}
                        variant="light">
                        {props.icon}
                    </ThemeIcon>
                )}

                {props.label ? <Text size="sm">{props.label}</Text> : null}
            </Group>
        </UnstyledButton>
    );
};
