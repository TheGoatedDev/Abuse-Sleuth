import { Session } from "@abuse-sleuth/authentication";
import { SessionProvider } from "@abuse-sleuth/authentication/nextjs/client";
import { ModalsProvider } from "@abuse-sleuth/ui/modals";
import { NotificationsProvider } from "@abuse-sleuth/ui/notifications";
import { GlobalStyling, MantineProvider } from "@abuse-sleuth/ui/shared";
import { FCC } from "@abuse-sleuth/ui/types";

import TeamCreateModal from "@components/dashboard/features/modals/TeamCreateModal";
import TeamEditModal from "@components/dashboard/features/modals/TeamEditModal";

export const ProviderWrapper: FCC<{ session?: Session }> = ({
    session,
    children,
}) => {
    return (
        <SessionProvider session={session}>
            <MantineProvider>
                <NotificationsProvider autoClose={5000}>
                    <ModalsProvider
                        modals={{
                            teamCreate: TeamCreateModal,
                            teamEdit: TeamEditModal,
                        }}
                        modalProps={{
                            centered: true,
                        }}>
                        <GlobalStyling />
                        {children}
                    </ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </SessionProvider>
    );
};
