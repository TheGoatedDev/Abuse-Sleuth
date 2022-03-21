import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { Box, Container, Group, Title } from "@abuse-sleuth/ui";

import DashboardLayout from "@layouts/dashboardLayout";

export default function UserBilling() {
    return (
        <DashboardLayout>
            <Title>User Settings</Title>
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
