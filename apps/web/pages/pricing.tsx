import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Stripe from "stripe";

import { Group, Title } from "@abuse-sleuth/ui";

import PriceCard from "@components/pricing/pricingCard";
import DefaultLayout from "@layouts/defaultLayout";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

const Pricing: NextPage<{
    products: Stripe.Product[];
    prices: Stripe.Response<Stripe.ApiList<Stripe.Price>>;
}> = (props) => {
    const [products, setProducts] = useState<JSX.Element[]>();

    useEffect(() => {
        setProducts(
            props.products.map((product) => {
                const price = props.prices.data.find(
                    (price) => price.product == product.id
                );
                return (
                    <PriceCard
                        key={product.id}
                        name={product.name}
                        price={(price?.unit_amount! / 100).toLocaleString(
                            "en-US",
                            {
                                style: "currency",
                                currency: "usd",
                            }
                        )}
                        smallPriceText={price?.unit_amount ? "per month" : ""}
                        description={product.description ?? ""}
                        perks={[
                            `${product.metadata.dailyIPQuota} IP Searches per Day`,
                            `${product.metadata.monthlyScanQuota} Log Scans per Month`,
                            `Scan Report retains for ${
                                product.metadata.reportRetentionSpanWeeks
                            } week${
                                Number(
                                    product.metadata.reportRetentionSpanWeek
                                ) > 1
                                    ? "s"
                                    : ""
                            }`,
                            ...product.metadata.additional.split(","),
                        ]}
                    />
                );
            })
        );
    }, []);

    return (
        <DefaultLayout>
            <Title mt={"sm"} align="center">
                Pricing Plans
            </Title>
            <Group position="center" mt="md">
                {products}
            </Group>
        </DefaultLayout>
    );
};

export default Pricing;

export const getStaticProps: GetStaticProps = async (context) => {
    const stripe = getStripeAdmin();

    const getProductByName = (name: string, data: Stripe.Product[]) => {
        return data.find((product) => product.name == name);
    };

    const raw = (await stripe.products.list()).data;

    const products = [];

    products.push(getProductByName("Free", raw));
    products.push(getProductByName("Basic", raw));
    products.push(getProductByName("Advanced", raw));
    products.push(getProductByName("Elite", raw));
    //products.push(getProductByName("Flex", raw));

    const prices = await stripe.prices.list();

    return {
        props: {
            products: products,
            prices,
        },
    };
};
