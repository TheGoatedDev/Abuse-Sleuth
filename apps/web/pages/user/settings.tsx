import { Title } from "@abuse-sleuth/ui";

import { useAuth } from "@hooks/AuthHook";
import DashboardLayout from "@layouts/DashboardLayout";

export default function UserBilling() {
    const auth = useAuth(true);

    return (
        <DashboardLayout>
            <Title>User Settings</Title>
        </DashboardLayout>
    );
}
