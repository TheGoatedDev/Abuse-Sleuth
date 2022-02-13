import LogScanForm from "@components/forms/scanForm/logScanForm";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { Center, Title } from "@mantine/core";
import { firebaseAuth } from "@services/firebase";
import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";

const Scan: NextPage = () => {
    const [user, loading, _error] = useAuthState(firebaseAuth);

    return (
        <ProtectedComponent
            authRequired
            redirect="/login"
            user={user}
            loading={loading}
        >
            <LayoutDashboard>
                <Title align="center">Log Scan</Title>
                <Center mt="md">
                    <div style={{ width: "300px" }}>
                        <LogScanForm />
                    </div>
                </Center>
            </LayoutDashboard>
        </ProtectedComponent>
    );
};

export default Scan;
