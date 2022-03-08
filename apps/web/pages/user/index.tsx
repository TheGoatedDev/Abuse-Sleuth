import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import DashboardLayout from "@layouts/dashboardLayout";
import DefaultLayout from "@layouts/defaultLayout";

import { Box, Container, Group, Title } from "@mantine/core";

export default function UserIndex() {
    return (
        <DashboardLayout>
            <Title>User</Title>
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
