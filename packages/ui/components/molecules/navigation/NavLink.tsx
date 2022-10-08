import { Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

import { FCC } from "../../../types";

export type INavLinkProps = {
    href: string;
    color?: string;
};

export const NavLink: FCC<INavLinkProps> = ({ href, color, children }) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} passHref>
            <Text
                weight={"bold"}
                sx={(theme) => ({
                    color: color
                        ? color
                        : theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.black,
                    textDecoration: isActive ? "underline" : "none",
                    transition: "color 0.2s ease-in-out",
                    "&:hover": {
                        color: theme.fn.darken(
                            color
                                ? color
                                : theme.colorScheme === "dark"
                                ? theme.colors.dark[0]
                                : theme.black,
                            0.1
                        ),
                    },
                })}
                component="a">
                {children}
            </Text>
        </Link>
    );
};

export default NavLink;
