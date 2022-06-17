import { Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export type INavLinkProps = {
    href: string;
    color?: string;
};

export const NavLink: React.FC<INavLinkProps> = ({
    href,
    color = "#FFF",
    children,
}) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} passHref>
            <Text
                weight={"bold"}
                sx={(theme) => ({
                    color: color,
                    textDecoration: isActive ? "underline" : "none",
                    transition: "color 0.2s ease-in-out",
                    "&:hover": {
                        color: theme.fn.darken(color, 0.1),
                    },
                })}
                component="a">
                {children}
            </Text>
        </Link>
    );
};

export default NavLink;
