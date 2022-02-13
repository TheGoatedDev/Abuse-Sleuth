import { Center, Title } from "@mantine/core";
import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { firebaseAuth } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import IPScanForm from "@components/forms/scanForm/ipScanForm";

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
                <Title align="center">IP Scan</Title>
                <Center mt="md">
                    <div style={{ width: "400px" }}>
                        <IPScanForm />
                    </div>
                </Center>
            </LayoutDashboard>
        </ProtectedComponent>
    );
};

export default Scan;
