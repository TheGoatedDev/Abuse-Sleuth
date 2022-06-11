import { Title } from "@abuse-sleuth/ui";

import DashboardLayout from "@components/layouts/DashboardLayout";
import { useAuth } from "@hooks/useAuth";

export default function UserBilling() {
    const auth = useAuth(true);

    return (
        <DashboardLayout>
            <Title>User Settings</Title>
        </DashboardLayout>
    );
}
