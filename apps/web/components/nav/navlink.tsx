import { Text, ThemeIcon } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavLink = ({ href, children }) => {
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
                        color:
                            theme.colorScheme == "dark"
                                ? theme.white
                                : theme.colors.gray[7],
                    },
                })}
                component="a">
                {children}
            </Text>
        </Link>
    );
};

export default NavLink;
