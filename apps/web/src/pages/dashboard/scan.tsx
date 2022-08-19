import { DashboardLayout, Title } from "@abuse-sleuth/ui";

import DashboardNavbar from "@components/navigation/DashboardNavbar";

export default function DashboardScan() {
    return (
        <DashboardLayout navbar={<DashboardNavbar />}>
            <Title>Scanning</Title>
        </DashboardLayout>
    );
}
