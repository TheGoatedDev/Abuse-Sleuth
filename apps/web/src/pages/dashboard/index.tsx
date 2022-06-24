import { FaArrowDown, FaArrowUp, FaMinus } from "react-icons/fa";

import {
    Group,
    Loader,
    Paper,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui";

import DashboardLayout from "@components/layouts/DashboardLayout";
import RecentUpdates from "@components/sections/RecentUpdates";
import StatsCard from "@components/statistics/StatsCard";
import { trpc } from "@utils/trpc/reactQueryHooks";

export default function Home() {
    const query = trpc.useQuery(["users:me"]);

    return (
        <DashboardLayout>
            <Stack
                sx={(theme) => ({
                    height: "100%",
                })}>
                <Title>Hello {query.data?.username ?? <Loader />}</Title>
                <Text color={"dimmed"}>Welcome Back!</Text>

                <SimpleGrid
                    cols={3}
                    breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                    <StatsCard
                        label="Domain Quota"
                        stats={150}
                        statsMax={500}
                    />
                    <StatsCard label="IP Quota" stats={1000} statsMax={1000} />
                    <StatsCard label="Report Quota" stats={1} statsMax={5} />
                </SimpleGrid>

                <Group
                    sx={(theme) => ({
                        [theme.fn.smallerThan("sm")]: {
                            flexDirection: "column",
                        },
                    })}
                    position={"apart"}
                    align="flex-start"
                    noWrap>
                    <RecentUpdates />
                    <Stack
                        sx={(theme) => ({
                            minWidth: "32.1%",
                            [theme.fn.smallerThan("sm")]: {
                                minWidth: "100%",
                            },
                        })}>
                        <Title order={3}>Weekly Statistics</Title>
                        <StatsCard
                            label="Scanned IPs"
                            stats={1}
                            centerIcon={<FaArrowDown color="red" />}
                        />
                        <StatsCard
                            label="Scanned Domains"
                            stats={6}
                            centerIcon={<FaArrowUp color="lime" />}
                        />
                        <StatsCard
                            label="Created Reports"
                            stats={10000}
                            centerIcon={<FaMinus />}
                        />
                        <StatsCard
                            label="Total Criticial Updates"
                            stats={10}
                            centerIcon={<FaArrowUp color="lime" />}
                        />
                    </Stack>
                </Group>

                <Stack
                    spacing={"xs"}
                    sx={(theme) => ({
                        flexGrow: 1,
                    })}>
                    <SimpleGrid
                        cols={2}
                        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                        sx={(theme) => ({
                            flexGrow: 1,
                        })}>
                        <Paper withBorder p="sm">
                            <Stack
                                sx={(theme) => ({
                                    height: "100%",
                                })}>
                                <Group position="apart">
                                    <Title order={4}>Twitter Feed</Title>
                                    <Text color="dimmed" size="xs">
                                        Updated: 18/06/22
                                    </Text>
                                </Group>
                                <Skeleton
                                    sx={(theme) => ({
                                        display: "flex",
                                        flexGrow: 1,
                                        minHeight: "50px",
                                    })}
                                />
                            </Stack>
                        </Paper>
                        <Paper withBorder p="sm">
                            <Stack
                                sx={(theme) => ({
                                    height: "100%",
                                })}>
                                <Group position="apart">
                                    <Title order={4}>Hacker News</Title>
                                    <Text color="dimmed" size="xs">
                                        Updated: 18/06/22
                                    </Text>
                                </Group>
                                <Skeleton
                                    sx={(theme) => ({
                                        display: "flex",
                                        flexGrow: 1,
                                        minHeight: "50px",
                                    })}
                                />
                            </Stack>
                        </Paper>
                    </SimpleGrid>
                </Stack>
            </Stack>
        </DashboardLayout>
    );
}
