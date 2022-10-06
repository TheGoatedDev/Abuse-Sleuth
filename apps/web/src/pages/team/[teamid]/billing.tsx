import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import {
    nextAuthOptions,
    unstable_getServerSession,
} from "@abuse-sleuth/authentication";
import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { Stripe } from "@abuse-sleuth/stripe/Stripe";
import { appRouter } from "@abuse-sleuth/trpc";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button,
    Divider,
    Group,
    Icon,
    Loader,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    Title,
    Tooltip,
} from "@abuse-sleuth/ui/components/atoms";
import { PricingCard } from "@abuse-sleuth/ui/components/compounds";
import { IconExclamationMark, IconInfoSquare } from "@abuse-sleuth/ui/icons";

import { Layout } from "@components/dashboard/layouts";
import Routes from "@utils/routes";

const CheckoutButton: FC<{ productId: string; teamId: string }> = ({
    productId,
    teamId,
}) => {
    const getCheckoutSession = trpcClient.stripe.getCheckoutSession.useQuery({
        teamId,
        productId,
        checkout: {
            cancel_url:
                process.env["NEXT_PUBLIC_VERCEL_URL"] +
                Routes.team.view(teamId),
            success_url:
                process.env["NEXT_PUBLIC_VERCEL_URL"] +
                Routes.team.billing(teamId),
        },
    });

    return (
        <Link href={getCheckoutSession.data ?? "#"} passHref>
            <Button component={"a"} loading={getCheckoutSession.isLoading}>
                Switch Plan
            </Button>
        </Link>
    );
};

const TeamBilling: NextPage = () => {
    const router = useRouter();
    const teamId = router.query.teamid as string;

    const getTeamQuery = trpcClient.teams.get.useQuery({
        teamId,
    });

    const getAllProducts = trpcClient.stripe.products.getAllProducts.useQuery();

    //  TODO: Improve this, Make it Centralised
    if (getTeamQuery.isLoading || getAllProducts.isLoading) {
        return (
            <Layout>
                <Group
                    position="center"
                    sx={() => ({
                        height: "100vh",
                    })}>
                    <Loader size={"xl"} color="violet" />
                </Group>
            </Layout>
        );
    }

    // TODO: Improve this, Make it Centralised
    if (
        getTeamQuery.isError ||
        !getTeamQuery.data ||
        getAllProducts.isError ||
        !getAllProducts.data
    ) {
        return (
            <Layout>
                <Group
                    position="center"
                    sx={() => ({
                        height: "100vh",
                    })}>
                    <Stack spacing={"xs"} align={"center"}>
                        <Icon
                            icon={<IconExclamationMark />}
                            color={"red"}
                            size={56}
                            stroke={3}
                        />
                        <Title>Error has Occurred</Title>
                        <Text>Error: {getTeamQuery.error?.message}</Text>
                        <Text color={"dimmed"} size="xs">
                            Check the Console, if you are tech-savvy...
                        </Text>
                    </Stack>
                </Group>
            </Layout>
        );
    }

    return (
        <Layout>
            <Group position="apart">
                <Title>
                    {getTeamQuery.data.teamName ?? <Skeleton width={45} />}{" "}
                    Billing
                </Title>
            </Group>
            <Divider my="md" />
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
                            pricing={pricing.unit_amount!}
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
                                        {x.metadata["membersLimit"]} Team
                                        Members
                                        <IconInfoSquare size={16} />
                                    </Group>
                                </Tooltip>,
                                `${x.metadata["scansLimit"]} Scans`,
                                `${x.metadata["reportsLimit"]} Reports`,
                                `${x.metadata["reportRetentionLimit"]} Weeks Report Retention`,
                                "Many More Features Included",
                            ]}
                            button={
                                <CheckoutButton
                                    teamId={teamId}
                                    productId={x.id}
                                />
                            }
                        />
                    );
                })}
            </SimpleGrid>
        </Layout>
    );
};

// TODO: Check if OWNER
export const getServerSideProps: GetServerSideProps = requireAuth(
    async (context) => {
        const teamId = context.query["teamid"] as string;

        const session = await unstable_getServerSession(
            context.req,
            context.res,
            nextAuthOptions
        );

        const caller = appRouter.createCaller({ user: session!.user });

        try {
            const selfMember = await caller.teams.members.getSelf({
                teamId,
            });

            if (selfMember?.role === "OWNER") {
                return {
                    props: {},
                };
            }
        } catch (error) {
            return {
                redirect: {
                    destination: Routes.team.view(teamId),
                },
                props: {},
            };
        }

        return {
            props: {},
        };
    }
);

export default TeamBilling;
