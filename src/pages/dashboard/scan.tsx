import { Center, Title } from "@mantine/core";
import type { NextPage } from "next";
import IPScanForm from "@components/forms/ipScanForm";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import useRedirectIfNotAuth from "@hooks/useRedirectIfNotAuth";

const Scan: NextPage = () => {
    useRedirectIfNotAuth({ redirectTo: "/login" });
    return (
        <LayoutDashboard>
            <Title align="center">IP Scan</Title>
            <Center mt="md">
                <div style={{ width: "400px" }}>
                    <IPScanForm />
                </div>
            </Center>
        </LayoutDashboard>
    );
};

export default Scan;
