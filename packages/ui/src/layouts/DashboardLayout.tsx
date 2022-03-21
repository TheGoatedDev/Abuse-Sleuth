import React from "react";

import { AppShell, Box } from "@mantine/core";

export type IDashboardLayoutProps = {
    navbar: React.ReactElement;
};

export const DashboardLayout: React.FC<IDashboardLayoutProps> = ({
    children,
    navbar,
}) => {
    return (
        <AppShell
            sx={(theme) => ({
                height: "100vh",
            })}
            padding={0}
            navbar={navbar}>
            <Box
                sx={(theme) => ({
                    marginLeft: "250px",
                })}>
                {children}
            </Box>
        </AppShell>
    );
};
