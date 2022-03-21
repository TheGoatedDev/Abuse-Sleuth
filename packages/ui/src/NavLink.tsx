import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Text } from "@mantine/core";

export type INavLinkProps = {
    href: string;
};

export const NavLink: React.FC<INavLinkProps> = ({ href, children }) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} passHref>
            <Text
                weight={"bold"}
                sx={(theme) => ({
                    textDecoration: isActive ? "underline" : "none",
                    transition: "color 0.2s ease-in-out",
                    "&:hover": {
                        color: theme.white,
                    },
                })}
                component="a">
                {children}
            </Text>
        </Link>
    );
};

export default NavLink;
