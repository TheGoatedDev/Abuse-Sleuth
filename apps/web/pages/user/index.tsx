import { Title } from "@abuse-sleuth/ui";

import { useAuth } from "@hooks/AuthHook";
import DashboardLayout from "@layouts/DashboardLayout";

export default function UserIndex() {
    const auth = useAuth(true);

    return (
        <DashboardLayout>
            <Title>User: {auth.user ? auth.user.email : ""}</Title>
        </DashboardLayout>
    );
}
