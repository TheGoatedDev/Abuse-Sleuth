import { Center, Title } from "@mantine/core";
import type { NextPage } from "next";
import LogScanForm from "../../forms/logScanForm";
import LayoutDashboard from "../../layouts/LayoutDashboard";

const Scan: NextPage = () => {
    return (
        <LayoutDashboard>
            <Title align="center">Log Scan</Title>
            <Center mt="md">
                <div style={{ width: "300px" }}>
                    <LogScanForm />
                </div>
            </Center>
        </LayoutDashboard>
    );
};

export default Scan;
