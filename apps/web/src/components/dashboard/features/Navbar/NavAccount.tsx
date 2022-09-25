import { NextLink } from "@mantine/next";

import {
    signOut,
    useSession,
} from "@abuse-sleuth/authentication/nextjs/client";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { Menu } from "@abuse-sleuth/ui/components/atoms";
import { DashboardNavAccount } from "@abuse-sleuth/ui/components/compounds";
import { IconCash, IconLogout, IconUser } from "@abuse-sleuth/ui/icons";

import routes from "@utils/routes";

export const NavAccount: React.FC = () => {
    const { data: session } = useSession();
    const getBillingPortalQuery = trpcClient.users.getBillingPortal.useQuery();

    return (
        <DashboardNavAccount
            name={session?.user?.name ?? ""}
            image={session?.user?.image ?? ""}
            menuPosition="right-end"
            menuContents={
                <>
                    <Menu.Item
                        component={NextLink}
                        href={routes.account.viewAccount}
                        icon={<IconUser size={"18px"} />}>
                        View Account
                    </Menu.Item>
                    <Menu.Item
                        component="a"
                        href={getBillingPortalQuery.data ?? "#"}
                        icon={<IconCash size={"18px"} />}>
                        View Billing
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
