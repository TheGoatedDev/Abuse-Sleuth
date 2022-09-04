import {
    Group,
    MantineColor,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export const DashboardNavbarLink: React.FC<{
    href: string;
    color: MantineColor;
    label: string;
    icon: JSX.Element;
}> = (props) => {
    const router = useRouter();
    const isActive = router.pathname === props.href;

    return (
        <Link href={props.href} passHref>
            <UnstyledButton
                component="a"
                sx={(theme) => ({
                    display: "block",
                    //width: "100%",
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    backgroundColor: isActive
                        ? theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0]
                        : "transparent",
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
                    <ThemeIcon size={"lg"} color={props.color} variant="light">
                        {props.icon}
                    </ThemeIcon>
                    <Text size="sm">{props.label}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
};
