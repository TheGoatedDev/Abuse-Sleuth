import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import Stripe from "stripe";

import { prisma } from "@abuse-sleuth/prisma";
import {
    Box,
    Button,
    Center,
    Container,
    SimpleGrid,
    StatsCard,
    Title,
} from "@abuse-sleuth/ui";

import DashboardLayout from "@layouts/DashboardLayout";
import createCheckoutSessionFromAPI from "@libs/api/helper/createCheckoutSessions";
import { getSession } from "@libs/auth/authServerHelpers";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";
import getStripeClient from "@libs/stripe/stripeClient";

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
            <Container p={"xl"} mt="md">
                <Title align="center" mb="md">
                    Billing
                </Title>

                <SimpleGrid
                    breakpoints={[
                        { minWidth: "sm", cols: 1 },
                        { minWidth: "md", cols: 3 },
                    ]}>
                    <StatsCard
                        icon={<FontAwesomeIcon icon={["fas", "file"]} />}
                        title="Current Plan"
                        stat={product ? product.name : "Free"}
                        color={"default"}
                    />
                    <StatsCard
                        icon={<FontAwesomeIcon icon={["fas", "money-check"]} />}
                        title="Monthly Bill"
                        stat={
                            subscription ? (
                                <>
                                    {(
                                        subscription.items.data[0].plan.amount /
                                        100
                                    ).toLocaleString("en-US", {
                                        style: "currency",
                                        currency:
                                            subscription.items.data[0].plan
                                                .currency,
                                    })}
                                </>
                            ) : (
                                "None"
                            )
                        }
                        color={"default"}
                    />
                    <StatsCard
                        icon={<FontAwesomeIcon icon={["fas", "calendar"]} />}
                        title="Next Billing Date"
                        stat={
                            subscription ? (
                                <>
                                    {dayjs(
                                        subscription.current_period_end * 1000
                                    ).format("DD/MM/YYYY")}
                                </>
                            ) : (
                                "None"
                            )
                        }
                        color={"default"}
                    />
                </SimpleGrid>
                <Center mt={"md"}>
                    <Button
                        color={"red"}
                        onClick={onTestClick}
                        disabled={
                            subscription === undefined ||
                            subscription === null ||
                            product === undefined ||
                            product === null
                        }>
                        Cancel Plan
                    </Button>
                </Center>
                <Button onClick={onTestClick}>Test</Button>
            </Container>
        </DashboardLayout>
    );
}

// TODO: Make this an API Endpoint
export const getServerSideProps: GetServerSideProps = async (context) => {
    console.time("OOF");
    const session = await getSession(context.req, context.res);
    console.timeEnd("OOF");

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
            userId: session.id,
        },
    });

    const stripe = getStripeAdmin();

    const subscriptions = await stripe.subscriptions.list({
        customer: userBillingInfo.stripeCustomerId,
    });

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
