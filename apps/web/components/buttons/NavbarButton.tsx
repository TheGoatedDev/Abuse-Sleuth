import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

import {
    Group,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
    Text,
    MantineColor,
} from "@mantine/core";

interface PropsType {
    color: MantineColor;
    icon: IconProp;
    href: string;
}

const NavbarButton: React.FC<PropsType> = (props) => {
    const theme = useMantineTheme();
    const router = useRouter();
    const isActive = router.pathname === props.href;

    return (
        <Link href={props.href} passHref>
            <UnstyledButton
                sx={(theme) => ({
                    background: isActive
                        ? theme.fn.linearGradient(
                              90,
                              theme.colorScheme === "dark"
                                  ? theme.colors[props.color][5]
                                  : theme.colors[props.color][2],
                              theme.colorScheme === "dark"
                                  ? theme.colors.dark[7]
                                  : theme.white
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
                            theme.colorScheme === "dark"
                                ? theme.colors[props.color][5]
                                : theme.colors[props.color][2],
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[7]
                                : theme.white
                        ),
                    },
                })}>
                <Group>
                    <ThemeIcon color={props.color} size={"lg"}>
                        <FontAwesomeIcon
                            color={theme.colors[props.color][1]}
                            icon={props.icon}
                            size="lg"
                        />
                    </ThemeIcon>
                    <Text>{props.children}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
};

export default NavbarButton;
