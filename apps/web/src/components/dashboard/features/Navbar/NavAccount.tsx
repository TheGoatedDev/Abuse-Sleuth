import { AppShell } from "@mantine/core";
import { NextLink } from "@mantine/next";

import {
    signOut,
    useSession,
} from "@abuse-sleuth/authentication/nextjs/client";
import { Menu } from "@abuse-sleuth/ui/components/atoms";
import { DashboardNavAccount } from "@abuse-sleuth/ui/components/compounds";
import { IconUser, IconLogout } from "@abuse-sleuth/ui/icons";
import { FCC } from "@abuse-sleuth/ui/types";

export const NavAccount: React.FC = () => {
    const { data: session } = useSession();

    return (
        <DashboardNavAccount
            name={session?.user?.name ?? ""}
            email={session?.user?.email ?? ""}
            image={session?.user?.image ?? ""}
            menuPosition="right-end"
            menuContents={
                <>
                    <Menu.Item
                        component={NextLink}
                        href="/account"
                        icon={<IconUser size={"18px"} />}>
                        View Account
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                        icon={<IconLogout size={"18px"} />}
                        color="red"
                        onClick={() => {
                            signOut();
                        }}>
                        Logout
                    </Menu.Item>
                </>
            }
        />
    );
};
