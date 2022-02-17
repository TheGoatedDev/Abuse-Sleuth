import LayoutStandard from "@components/layouts/LayoutStandard";
import PriceCard from "@components/shared/cards/PriceCards";
import { Group, Space, Title } from "@mantine/core";
import { getStripeAdmin } from "@services/stripe/stripeAdmin";
import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { Stripe } from "stripe";

const Pricing: NextPage<{
    products: Stripe.Product[];
    prices: Stripe.Response<Stripe.ApiList<Stripe.Price>>;
}> = (props) => {
    const [products, setProducts] = useState<any>();

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
                        price={"$" + (price?.unit_amount! / 100).toFixed(2)}
                        smallPriceText={price?.unit_amount ? "per month" : ""}
                        description={product.description ?? ""}
                        perks={[
                            product.metadata.point1,
                            product.metadata.point2,
                            product.metadata.point3,
                            product.metadata.point4,
                        ]}
                    />
                );
            })
        );
    }, []);

    return (
        <LayoutStandard>
            <Title align="center">Pricing Plans</Title>
            <Space h="lg" />
            <Group position="center" spacing={"md"}>
                {products}
            </Group>
        </LayoutStandard>
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
    products.push(getProductByName("Flex", raw));

    const prices = await stripe.prices.list();

    return {
        props: {
            products: products,
            prices,
        },
    };
};
