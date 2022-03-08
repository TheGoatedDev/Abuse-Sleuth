import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import NavbarButton from "@components/buttons/NavbarButton";
import BasicThemeSwitcher from "@components/themeSwitcher/basicThemeSwitcher";

import {
    Group,
    Navbar,
    ScrollArea,
    Text,
    Button,
    Box,
    Divider,
    Avatar,
    Center,
    Menu,
    Accordion,
} from "@mantine/core";

const MyNavbar: React.FC = () => {
    const session = useSession();
    const router = useRouter();

    return (
        <Navbar width={{ base: 250 }} padding="sm" fixed>
            <Navbar.Section>
                <Group position="center">
                    <Link href="/" passHref>
                        <Text
                            size="xl"
                            weight={"bolder"}
                            align="center"
                            component="a">
                            Abuse Sleuth
                        </Text>
                    </Link>
                    <BasicThemeSwitcher />
                </Group>
            </Navbar.Section>
            <Navbar.Section
                grow
                component={ScrollArea}
                sx={(theme) => ({
                    marginTop: theme.spacing.xs,
                })}>
                <NavbarButton
                    color={"blue"}
                    icon={["fas", "home"]}
                    href={"/dashboard"}>
                    Home
                </NavbarButton>
                <NavbarButton
                    color={"indigo"}
                    icon={["fas", "search"]}
                    href={"/dashboard/checkip"}>
                    Check Single IP
                </NavbarButton>
                <NavbarButton
                    color={"green"}
                    icon={["fas", "search-plus"]}
                    href={"/dashboard/scanlog"}>
                    Scan Logs
                </NavbarButton>

                <NavbarButton
                    color={"orange"}
                    icon={["fas", "file"]}
                    href={"/dashboard/reports"}>
                    View Reports
                </NavbarButton>
            </Navbar.Section>
            <Divider label="Profile" labelPosition="center" size={"md"} />
            <Navbar.Section>
                <Center>
                    <Group mb="xs" align={"center"}>
                        <Avatar size={"md"} radius={"xl"} color="blue" />
                        <Text align="left">{session.data?.user.email}</Text>
                        <Menu position="right" gutter={25} withArrow>
                            <Menu.Item
                                onClick={() => router.push("/user/billing")}
                                icon={
                                    <FontAwesomeIcon
                                        icon={["fas", "money-check"]}
                                    />
                                }>
                                Subscription
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => router.push("/user/settings")}
                                icon={
                                    <FontAwesomeIcon icon={["fas", "cog"]} />
                                }>
                                Settings
                            </Menu.Item>
                        </Menu>
                    </Group>
                </Center>
                <Button
                    leftIcon={<FontAwesomeIcon icon={["fas", "sign-out"]} />}
                    variant="default"
                    radius={"xl"}
                    onClick={() => signOut()}
                    fullWidth>
                    Logout
                </Button>
            </Navbar.Section>
        </Navbar>
    );
};

export default MyNavbar;
