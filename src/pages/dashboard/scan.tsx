import { Center, Title } from "@mantine/core";
import type { GetServerSideProps, NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import IPScanForm from "@components/forms/scanForm/ipScanForm";
import { redirectIfNoAuth } from "@libs/helpers/redirectIfNoAuth";

const Scan: NextPage = () => {
    return (
        <LayoutDashboard>
            <Title align="center">IP Scan</Title>
            <Center mt="md">
                <IPScanForm />
            </Center>
        </LayoutDashboard>
    );
};

export default Scan;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await redirectIfNoAuth(context);
};
