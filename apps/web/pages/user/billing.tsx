import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import DashboardLayout from "@layouts/dashboardLayout";

import { Box, Container, Group, Title } from "@mantine/core";

export default function UserBilling() {
    return (
        <DashboardLayout>
            <Title>User Billing</Title>
        </DashboardLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
