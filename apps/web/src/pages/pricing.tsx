import type { GetStaticProps, NextPage } from "next";

import stripe, { Stripe } from "@abuse-sleuth/stripe";
import {
    Button,
    Group,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Card,
    Center,
    Divider,
    List,
    Grid,
} from "@abuse-sleuth/ui/components/atoms";
import { useMantineTheme, useMediaQuery } from "@abuse-sleuth/ui/hooks";
import { IconCheck } from "@abuse-sleuth/ui/icons";

import Navbar from "@components/main/features/Navbar";
import { AltLayout, Layout } from "@components/main/layouts";

const PricingCard: React.FC<{
    product: Stripe.Product;
    price: Stripe.Price;
}> = (props) => {
    return (
        <Grid.Col md={3} sm={4} xs={6}>
            <Card px="lg" py={"xs"} withBorder>
                <Stack>
                    <Text align="center" size={24} weight="bold" color="violet">
                        {props.product.name}
                    </Text>
                    <Title align="center" order={1}>
                        {/* TODO: Make it Display Correctly */}
                        {((props.price.unit_amount ?? 0) / 100).toLocaleString(
                            "en-GB",
                            {
                                style: "currency",
                                currency: props.price.currency,
                            }
                        )}
                    </Title>
                    <Button color={"violet"}>Get started</Button>
                </Stack>

                <Card.Section my="sm">
                    <Divider />
                </Card.Section>

                <Group>
                    <List icon={<IconCheck />}>
                        <List.Item>
                            {props.product.metadata["usersLimit"] ??
                                "usersLimit Missing"}{" "}
                            Users on Team
                        </List.Item>
                        <List.Item>
                            {props.product.metadata["reportsLimit"] ??
                                "reportsLimit Missing"}{" "}
                            Reports on Team
                        </List.Item>
                        <List.Item>
                            {props.product.metadata["scansLimit"] ??
                                "scansLimit Missing"}{" "}
                            Scans on Team
                        </List.Item>
                        <List.Item>1 Week Retention on Reports</List.Item>
                    </List>
                </Group>
            </Card>
        </Grid.Col>
    );
};

interface PricingProps {
    products: Stripe.Product[];
}

const Pricing: NextPage<PricingProps> = (props) => {
    return (
        <AltLayout>
            <Navbar />
            <Center>
                <Stack align={"center"}>
                    <Title>Pricing</Title>
                    <Text>
                        All Pricing plans used for each team you create.
                    </Text>
                    <Grid mx={"sm"} grow justify={"center"}>
                        {props.products.map((v, i) => (
                            <PricingCard
                                key={i}
                                product={v}
                                price={v.default_price as Stripe.Price}
                            />
                        ))}
                    </Grid>
                </Stack>
            </Center>
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
