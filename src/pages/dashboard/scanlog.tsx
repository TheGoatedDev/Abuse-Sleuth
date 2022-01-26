import { Center, Title } from "@mantine/core";
import type { NextPage } from "next";
import LogScanForm from "../../components/forms/logScanForm";
import LayoutDashboard from "../../components/layouts/LayoutDashboard";

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
