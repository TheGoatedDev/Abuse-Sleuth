import type { GetStaticProps, NextPage } from "next";

import stripe from "@abuse-sleuth/stripe";
import { Stripe } from "@abuse-sleuth/stripe/Stripe";
import {
    Group,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Tooltip,
} from "@abuse-sleuth/ui/components/atoms";
import { PricingCard } from "@abuse-sleuth/ui/components/compounds";
import { IconInfoSquare } from "@abuse-sleuth/ui/icons";

import Navbar from "@components/main/features/Navbar";
import { AltLayout } from "@components/main/layouts";

interface PricingProps {
    products: Stripe.Product[];
}

const Pricing: NextPage<PricingProps> = (props) => {
    return (
        <AltLayout>
            <Navbar />
            <Stack align={"center"} spacing={0}>
                <Title>Pricing</Title>
                <Text color={"dimmed"}>
                    All Pricing plans used for each team you create.
                </Text>
            </Stack>
            <SimpleGrid
                p={"xl"}
                spacing={"xl"}
                breakpoints={[
                    { minWidth: "md", cols: props.products.length },
                    { minWidth: "sm", cols: 2 },
                    { minWidth: "xs", cols: 1 },
                ]}>
                {props.products.map((v, i) => {
                    const pricing = v.default_price as Stripe.Price;

                    return (
                        <PricingCard
                            key={i}
                            title={v.name}
                            description={v.description ?? ""}
                            pricing={pricing.unit_amount ?? 0}
                            currency={pricing.currency}
                            listItems={[
                                <Tooltip
                                    key={i + "-members"}
                                    withArrow
                                    position="bottom"
                                    label={
                                        "This includes yourself as a Member"
                                    }>
                                    <Group>
                                        {v.metadata["membersLimit"]} Team
                                        Members
                                        <IconInfoSquare size={16} />
                                    </Group>
                                </Tooltip>,
                                `${v.metadata["scansLimit"]} Scans`,
                                `${v.metadata["reportsLimit"]} Reports`,
                                `${v.metadata["reportRetentionLimit"]} Weeks Report Retention`,
                                "Many More Features Included",
                            ]}
                        />
                    );
                })}
            </SimpleGrid>
        </AltLayout>
    );
};

export default Pricing;

export const getStaticProps: GetStaticProps = async (context) => {
    const stripeProducts = await stripe.products.list({
        active: true,
        expand: ["data.default_price"],
    });

    const sortedProducts = stripeProducts.data.sort((a, b) => {
        const aPrice = a.default_price as Stripe.Price;
        const bPrice = b.default_price as Stripe.Price;

        return (aPrice.unit_amount ?? 0) - (bPrice.unit_amount ?? 0);
    });

    return {
        // Passed to the page component as props
        props: { products: sortedProducts },
    };
};
