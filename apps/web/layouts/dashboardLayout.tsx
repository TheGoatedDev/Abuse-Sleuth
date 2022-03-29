import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "hooks/AuthHook";
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
    DashboardLayout as ASDashboardLayout,
    Skeleton,
    Loader,
} from "@abuse-sleuth/ui";

const DashboardLayout: React.FC = ({ children }) => {
    const auth = useAuth();

    return (
        <ASDashboardLayout
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
                                href={"/dashboard/scan/ip"}>
                                Check Single IP
                            </NavbarButton>
                            <NavbarButton
                                color={"green"}
                                icon={
                                    <FontAwesomeIcon
                                        icon={["fas", "search-plus"]}
                                    />
                                }
                                href={"/dashboard/scan/log"}>
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
                            <Group mb="xs" position="apart">
                                <Box
                                    sx={(theme) => ({
                                        textAlign: "left",
                                    })}>
                                    <Avatar
                                        size={"md"}
                                        radius={"xl"}
                                        color="blue"
                                    />
                                </Box>

                                {auth.user ? (
                                    <Text
                                        align="center"
                                        sx={(theme) => ({
                                            flexGrow: "2",
                                        })}
                                        size="xs">
                                        {auth.user.emails[0].email}
                                    </Text>
                                ) : (
                                    <Loader size={"sm"} />
                                )}

                                <Box
                                    sx={(theme) => ({
                                        textAlign: "right",
                                    })}>
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
                                </Box>
                            </Group>

                            <Button
                                leftIcon={
                                    <FontAwesomeIcon
                                        icon={["fas", "sign-out"]}
                                    />
                                }
                                variant="default"
                                radius={"xl"}
                                onClick={() => auth.logout()}
                                fullWidth>
                                Logout
                            </Button>
                        </>
                    }
                />
            }>
            {children}
        </ASDashboardLayout>
    );
};

export default DashboardLayout;
