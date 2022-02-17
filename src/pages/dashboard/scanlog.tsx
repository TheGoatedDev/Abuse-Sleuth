import LogScanForm from "@components/forms/scanForm/logScanForm";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import { redirectIfNoAuth } from "@libs/helpers/redirectIfNoAuth";
import { Center, Title } from "@mantine/core";
import type { GetServerSideProps, NextPage } from "next";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await redirectIfNoAuth(context);
};
