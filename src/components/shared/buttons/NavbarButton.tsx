import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Group,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
    Text,
    MantineColor,
} from "@mantine/core";
import Link from "next/link";

interface PropsType {
    color: MantineColor;
    icon: IconProp | IconDefinition;
    href: string;
}

const NavbarButton: React.FC<PropsType> = (props) => {
    const theme = useMantineTheme();

    return (
        <Link href={props.href} passHref>
            <UnstyledButton
                style={{
                    padding: "10px",
                    width: "100%",
                    marginBottom: theme.spacing.xs,
                }}
                sx={(theme) => ({
                    borderRadius: theme.radius.md,
                    transition: "transform ease-in-out 1s",
                    "&:hover > div > div:nth-child(2)": {
                        transform: "translateX(15px)",
                    },
                    "& > div > div:nth-child(2)": {
                        transition: "transform ease-in-out .25s",
                    },
                    "&:hover": {
                        backgroundColor: theme.colors.gray[9],
                    },
                })}
            >
                <Group>
                    <ThemeIcon color={props.color} size={"lg"}>
                        <FontAwesomeIcon
                            color={theme.colors[props.color][1]}
                            icon={props.icon}
                            size="lg"
                        />
                    </ThemeIcon>
                    <Text size="md">{props.children}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
};

export default NavbarButton;
