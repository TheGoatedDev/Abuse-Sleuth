import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { report } from "process";
import ReactCountryFlag from "react-country-flag";
import Stripe from "stripe";

import StatsCard from "@components/StatsCard";
import DashboardLayout from "@layouts/dashboardLayout";
import createCheckoutSessionFromAPI from "@libs/api/helper/createCheckoutSessions";
import prisma from "@libs/prisma";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";
import getStripeClient from "@libs/stripe/stripeClient";

import {
    Box,
    Button,
    Center,
    Container,
    SimpleGrid,
    Title,
} from "@mantine/core";

export default function UserBilling({
    subscription,
    product,
}: {
    subscription?: Stripe.Subscription;
    product?: Stripe.Product;
}) {
    const onTestClick = async () => {
        const session = await createCheckoutSessionFromAPI(
            "price_1KTabQGZ9D2mPXT7otwuZGFj" //TODO: Create Different Subscriptions Options
        );
        const stripe = await getStripeClient();

        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    };

    return (
        <DashboardLayout>
            <Container padding={"xl"} mt="md">
                <Title align="center" mb="md">
                    Billing
                </Title>
                {subscription && product && (
                    <>
                        <SimpleGrid
                            breakpoints={[
                                { minWidth: "sm", cols: 1 },
                                { minWidth: "md", cols: 3 },
                            ]}>
                            <StatsCard
                                icon={["fas", "file"]}
                                title="Current Plan"
                                stat={<>{product.name}</>}
                                color={"default"}
                            />
                            <StatsCard
                                icon={["fas", "money-check"]}
                                title="Monthly Bill"
                                stat={
                                    <>
                                        {(
                                            subscription.items.data[0].plan
                                                .amount / 100
                                        ).toLocaleString("en-US", {
                                            style: "currency",
                                            currency:
                                                subscription.items.data[0].plan
                                                    .currency,
                                        })}
                                    </>
                                }
                                color={"default"}
                            />
                            <StatsCard
                                icon={["fas", "calendar"]}
                                title="Next Billing Date"
                                stat={
                                    <>
                                        {dayjs(
                                            subscription.current_period_end *
                                                1000
                                        ).format("DD/MM/YYYY")}
                                    </>
                                }
                                color={"default"}
                            />
                        </SimpleGrid>
                        <Center mt={"md"}>
                            <Button color={"red"} onClick={onTestClick}>
                                Cancel Plan
                            </Button>
                        </Center>
                    </>
                )}
                <Button onClick={onTestClick}>Test</Button>
            </Container>
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

    const userBillingInfo = await prisma.userBillingInfo.findUnique({
        where: {
            userId: session.user.id,
        },
    });

    const stripe = getStripeAdmin();

    const subscriptions = await stripe.subscriptions.list({
        customer: userBillingInfo.stripeCustomerId,
    });

    console.log(subscriptions);

    //const subscriptions = customer.subscriptions.data as Stripe.Subscription[];

    const subscription = subscriptions.data[0];

    if (subscription) {
        const product = await stripe.products.retrieve(
            subscription.items.data[0].plan.product.toString()
        );

        return {
            props: {
                subscription,
                product,
            },
        };
    }

    return {
        props: {},
    };
};
