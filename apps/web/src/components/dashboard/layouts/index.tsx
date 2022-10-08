import { AppShell } from "@mantine/core";

import { FCC } from "@abuse-sleuth/ui/types";

import Navbar from "../features/Navbar";

export const Layout: FCC = ({ children }) => {
    return (
        <AppShell fixed navbar={<Navbar />} padding="xl">
            {children}
        </AppShell>
    );
};
