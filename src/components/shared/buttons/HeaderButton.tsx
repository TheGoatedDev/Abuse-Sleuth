import {
    UnstyledButton,
    Text,
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
                    padding: "5px",
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
