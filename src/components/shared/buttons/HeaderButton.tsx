import { IconProp } from "@fortawesome/fontawesome-svg-core";
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
    href: string;
}

const HeaderButton: React.FC<PropsType> = (props) => {
    return (
        <Link href={props.href} passHref>
            <UnstyledButton
                style={{
                    padding: "10px",
                    fontWeight: "600",
                }}
                sx={(theme) => ({
                    "&:hover": {
                        color: theme.colors.gray[1],
                    },
                })}
            >
                <Text size="md">{props.children}</Text>
            </UnstyledButton>
        </Link>
    );
};

export default HeaderButton;
