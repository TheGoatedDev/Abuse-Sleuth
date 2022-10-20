import { FC } from "react";

import { Stripe } from "@abuse-sleuth/stripe/Stripe";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button,
    Group,
    Icon,
    Loader,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Tooltip,
} from "@abuse-sleuth/ui/components/atoms";
import { PricingCard } from "@abuse-sleuth/ui/components/compounds";
import { IconExclamationMark, IconInfoSquare } from "@abuse-sleuth/ui/icons";

import { Layout } from "@components/dashboard/layouts";

import CheckoutButton from "./CheckoutButton";

type PlanSwitcherProps = {
    teamId: string;
};

export const PlanSwitcher: FC<PlanSwitcherProps> = ({ teamId }) => {
    const getTeamProduct =
        trpcClient.stripe.products.getProductFromTeamId.useQuery({
            teamId,
        });

    const getAllProducts = trpcClient.stripe.products.getAllProducts.useQuery();

    if (getTeamProduct.isLoading || getAllProducts.isLoading) {
        <Layout>
            <Group position="center">
                <Loader size={"xl"} color="violet" />
            </Group>
        </Layout>;
    }

    if (!getTeamProduct.data || !getAllProducts.data) {
        return (
            <Paper>
                <Group position="center">
                    <Stack spacing={"xs"} align={"center"}>
                        <Icon
                            icon={<IconExclamationMark />}
                            color={"red"}
                            size={56}
                            stroke={3}
                        />
                        <Title>Error has Occurred</Title>
                        <Text>Error: {getTeamProduct.error?.message}</Text>
                        <Text color={"dimmed"} size="xs">
                            Check the Console, if you are tech-savvy...
                        </Text>
                    </Stack>
                </Group>
            </Paper>
        );
    }

    return (
        <SimpleGrid
            spacing={"xl"}
            breakpoints={[
                { minWidth: "md", cols: getAllProducts.data.length },
                { minWidth: "sm", cols: 2 },
                { minWidth: "xs", cols: 1 },
            ]}>
            {getAllProducts.data.map((x, i) => {
                const pricing = x.default_price! as Stripe.Price;

                return (
                    <PricingCard
                        key={i}
                        title={x.name}
                        description={x.description ?? ""}
                        pricing={pricing.unit_amount ?? 0}
                        currency={pricing.currency}
                        listItems={[
                            <Tooltip
                                key={i + "-members"}
                                withArrow
                                position="bottom"
                                label={"This includes yourself as a Member"}>
                                <Group>
                                    {x.metadata["membersLimit"]} Team Members
                                    <IconInfoSquare size={16} />
                                </Group>
                            </Tooltip>,
                            `${x.metadata["scansLimit"]} Scans`,
                            `${x.metadata["reportsLimit"]} Reports`,
                            `${x.metadata["reportRetentionLimit"]} Weeks Report Retention`,
                            "All Features Included",
                        ]}
                        button={
                            x.id !== getTeamProduct.data.id ? (
                                <CheckoutButton
                                    teamId={teamId}
                                    productId={x.id}
                                />
                            ) : (
                                <Button disabled>Current Plan</Button>
                            )
                        }
                    />
                );
            })}
        </SimpleGrid>
    );
};
