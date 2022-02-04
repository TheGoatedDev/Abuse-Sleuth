import { Center, Title } from "@mantine/core";
import type { NextPage } from "next";
import IPScanForm from "@components/forms/ipScanForm";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";

const Scan: NextPage = () => {
    return (
        <ProtectedComponent authRequired redirect="/login">
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
