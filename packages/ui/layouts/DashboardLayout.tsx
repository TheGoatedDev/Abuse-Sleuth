import { AppShell } from "@mantine/core";
import { FCC } from "types";

interface IDashboardLayoutProps {
    navbar: JSX.Element;
}

export const DashboardLayout: FCC<IDashboardLayoutProps> = ({
    children,
    navbar,
}) => {
    return (
        <AppShell fixed navbar={navbar}>
            {children}
        </AppShell>
    );
};
