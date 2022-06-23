import { FCC } from "types/types";

import { AppShell, Box, Navbar } from "@abuse-sleuth/ui";

import DashboardNavbar from "@components/navigation/DashboardNavbar";

const DashboardLayout: FCC = ({ children }) => {
    return (
        <AppShell fixed navbar={<DashboardNavbar />}>
            {children}
        </AppShell>
    );
};

export default DashboardLayout;
