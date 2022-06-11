import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { ReactNode } from "react";

import {
    Group,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
    Text,
    MantineColor,
} from "@mantine/core";

export interface INavbarButtonProps {
    color: MantineColor;
    icon: ReactNode;
    href: string;
}

export const NavbarButton: React.FC<INavbarButtonProps> = (props) => {
    const router = useRouter();
    const isActive = router.pathname === props.href;

    return (
        <Link href={props.href} passHref>
            <UnstyledButton
                sx={(theme) => ({
                    background: isActive
                        ? theme.fn.linearGradient(
                              90,
                              theme.colors[props.color][5],
                              theme.colors.dark[7]
                          )
                        : "transparent",

                    padding: "10px",
                    width: "100%",
                    marginBottom: theme.spacing.xs,
                    borderRadius: theme.radius.md,
                    transition: "transform,background ease-in-out 1s",
                    "&:hover > div > div:nth-of-type(2)": {
                        transform: "translateX(15px)",
                    },
                    "& > div > div:nth-of-type(2)": {
                        transform: isActive ? "translateX(15px)" : "",
                        transition: "transform ease-in-out .25s",
                    },
                    "&:hover": {
                        background: theme.fn.linearGradient(
                            90,
                            theme.colors[props.color][5],
                            theme.colors.dark[7]
                        ),
                    },
                })}>
                <Group>
                    <ThemeIcon color={props.color} size={"lg"}>
                        {props.icon}
                    </ThemeIcon>
                    <Text>{props.children}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
};
