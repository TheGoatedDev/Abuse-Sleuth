import { Session } from "@abuse-sleuth/authentication";
import { SessionProvider } from "@abuse-sleuth/authentication/nextjs/client";
import { ModalsProvider } from "@abuse-sleuth/ui/modals";
import { GlobalStyling, MantineProvider } from "@abuse-sleuth/ui/shared";
import { FCC } from "@abuse-sleuth/ui/types";

export const ProviderWrapper: FCC<{ session?: Session }> = ({
    session,
    children,
}) => {
    return (
        <SessionProvider session={session}>
            <MantineProvider>
                <ModalsProvider>
                    <GlobalStyling />
                    {children}
                </ModalsProvider>
            </MantineProvider>
        </SessionProvider>
    );
};
