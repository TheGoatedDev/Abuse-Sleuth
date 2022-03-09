import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import DashboardLayout from "@layouts/dashboardLayout";
import createCheckoutSession from "@libs/api/helper/createCheckoutSessions";
import getStripeClient from "@libs/stripe/stripeClient";

import { Box, Button, Container, Group, Title } from "@mantine/core";

export default function UserBilling() {
    const onTestClick = async () => {
        const session = await createCheckoutSession(
            "price_1KTabQGZ9D2mPXT7otwuZGFj"
        );
        const stripe = await getStripeClient();

        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    };

    return (
        <DashboardLayout>
            <Title>User Billing</Title>

            <Button onClick={onTestClick}>Test</Button>
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
