import { Center, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import IPScanResults from "@components/shared/ipScanResults";
import IPScanForm from "@components/forms/ipScanForm";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import useRedirectIfNotAuth from "@hooks/useRedirectIfNotAuth";

const Scan: NextPage = () => {
    const [result, setResult] = useState<AIPDBProfile | null>(null);
    useRedirectIfNotAuth({ redirectTo: "/login" });
    return (
        <LayoutDashboard>
            <Title align="center">IP Scan</Title>
            <Center mt="md">
                <div style={{ width: "300px" }}>
                    <IPScanForm setResult={setResult} />
                </div>
            </Center>
            <Center>
                <IPScanResults result={result ?? undefined} />
            </Center>
        </LayoutDashboard>
    );
};

export default Scan;
