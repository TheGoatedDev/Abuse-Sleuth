import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import router from "next/router";

import {
    AppShell,
    Avatar,
    Box,
    Button,
    Center,
    DashboardNavbar,
    Group,
    Menu,
    NavbarButton,
    Text,
} from "@abuse-sleuth/ui";

const DashboardLayout: React.FC = (props) => {
    const session = useSession();

    return (
        <AppShell
            sx={(theme) => ({
                height: "100vh",
            })}
            padding={0}
            navbar={
                <DashboardNavbar
                    mainZone={
                        <>
                            <NavbarButton
                                color={"blue"}
                                icon={
                                    <FontAwesomeIcon icon={["fas", "home"]} />
                                }
                                href={"/dashboard"}>
                                Home
                            </NavbarButton>
                            <NavbarButton
                                color={"indigo"}
                                icon={
                                    <FontAwesomeIcon icon={["fas", "search"]} />
                                }
                                href={"/dashboard/checkip"}>
                                Check Single IP
                            </NavbarButton>
                            <NavbarButton
                                color={"green"}
                                icon={
                                    <FontAwesomeIcon
                                        icon={["fas", "search-plus"]}
                                    />
                                }
                                href={"/dashboard/scanlog"}>
                                Scan Logs
                            </NavbarButton>

                            <NavbarButton
                                color={"orange"}
                                icon={
                                    <FontAwesomeIcon icon={["fas", "file"]} />
                                }
                                href={"/dashboard/reports"}>
                                View Reports
                            </NavbarButton>
                        </>
                    }
                    bottomZone={
                        <>
                            <Center>
                                <Group mb="xs" align={"center"}>
                                    <Avatar
                                        size={"md"}
                                        radius={"xl"}
                                        color="blue"
                                    />
                                    <Text align="left">
                                        {session.data?.user?.email}
                                    </Text>
                                    <Menu
                                        position="right"
                                        gutter={25}
                                        withArrow>
                                        <Menu.Item
                                            onClick={() =>
                                                router.push("/user/billing")
                                            }
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={[
                                                        "fas",
                                                        "money-check",
                                                    ]}
                                                />
                                            }>
                                            Subscription
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={() =>
                                                router.push("/user/settings")
                                            }
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={["fas", "cog"]}
                                                />
                                            }>
                                            Settings
                                        </Menu.Item>
                                    </Menu>
                                </Group>
                            </Center>
                            <Button
                                leftIcon={
                                    <FontAwesomeIcon
                                        icon={["fas", "sign-out"]}
                                    />
                                }
                                variant="default"
                                radius={"xl"}
                                onClick={() => signOut()}
                                fullWidth>
                                Logout
                            </Button>
                        </>
                    }
                />
            }>
            <Box
                sx={(theme) => ({
                    marginLeft: "250px",
                })}>
                {props.children}
            </Box>
        </AppShell>
    );
};

export default DashboardLayout;
