import { Center, Title } from "@mantine/core";
import { AIPDB_Report } from "@prisma/client";
import type { NextPage } from "next";
import { useState } from "react";
import IPScanResults from "../../components/ipScanResults";
import IPScanForm from "../../forms/ipScanForm";
import LayoutDashboard from "../../layouts/LayoutDashboard";

const Scan: NextPage = () => {
    const [result, setResult] = useState<AIPDB_Report | null>(null);

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
