import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
    ActionIcon,
    Button,
    Divider,
    Group,
    Menu,
    NavLink,
} from "@abuse-sleuth/ui";

type IComponentProps = {
    isDrawer?: boolean;
};

export const HeaderBody: React.FC<IComponentProps> = ({ isDrawer }) => {
    const session = useSession();
    const router = useRouter();

    const [opened, setOpened] = useState(false);

    return (
        <Group
            direction={isDrawer ? "column" : "row"}
            align={isDrawer ? "center" : "baseline"}
            sx={(theme) => ({
                alignItems: "center",
            })}>
            <NavLink href={"/pricing"}>Pricing</NavLink>
            {session.status !== "authenticated" ? (
                <Link href={"/auth/login"} passHref>
                    <Button radius={"md"} variant="filled" component="a">
                        Login
                    </Button>
                </Link>
            ) : (
                <>
                    <Menu
                        opened={opened}
                        onOpen={() => setOpened(true)}
                        onClose={() => setOpened(false)}
                        transition={opened ? "slide-up" : "slide-down"}
                        control={
                            <ActionIcon>
                                <FontAwesomeIcon icon={["fas", "user"]} />
                            </ActionIcon>
                        }>
                        <Menu.Label>User</Menu.Label>
                        <Menu.Item
                            onClick={() => router.push("/dashboard")}
                            icon={
                                <FontAwesomeIcon
                                    icon={["fas", "table-columns"]}
                                />
                            }>
                            Dashboard
                        </Menu.Item>
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
                            icon={<FontAwesomeIcon icon={["fas", "cog"]} />}>
                            Settings
                        </Menu.Item>
                        <Divider />
                        <Menu.Label>User Actions</Menu.Label>
                        <Menu.Item
                            icon={
                                <FontAwesomeIcon icon={["fas", "sign-out"]} />
                            }
                            color={"red"}
                            onClick={() => signOut()}>
                            Sign Out
                        </Menu.Item>
                    </Menu>
                    <Link href={"/dashboard"} passHref>
                        <Button component="a">Dashboard</Button>
                    </Link>
                </>
            )}
        </Group>
    );
};

export default HeaderBody;
