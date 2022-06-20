import { FaArrowDown, FaArrowUp, FaMinus } from "react-icons/fa";

import {
    Box,
    Group,
    Paper,
    SimpleGrid,
    Skeleton,
    Space,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui";

import DashboardLayout from "@components/layouts/DashboardLayout";
import RecentUpdates from "@components/sections/RecentUpdates";
import StatsCard from "@components/statistics/StatsCard";
import DashboardUpdatesTable, {
    Severity,
} from "@components/tables/DashboardUpdatesTable";

export default function Home() {
    return (
        <DashboardLayout>
            <Stack
                sx={(theme) => ({
                    height: "100%",
                })}>
                <Title>Hello {"USER_NAME_HERE"}</Title>
                <Text color={"dimmed"}>Welcome Back!</Text>

                <SimpleGrid
                    cols={3}
                    breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                    <StatsCard label="Domain Quota" progress={75} stats={150} />
                    <StatsCard label="IP Quota" progress={100} stats={1000} />
                    <StatsCard label="Report Quota" progress={25} stats={1} />
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
                        <Title order={3}>Weekly Interests</Title>
                        <StatsCard
                            label="Report Quota"
                            progress={25}
                            stats={1}
                            centerIcon={<FaArrowDown />}
                        />
                        <StatsCard
                            label="OOF Quota"
                            progress={100}
                            stats={6}
                            centerIcon={<FaArrowUp />}
                        />
                        <StatsCard
                            label="Vibe Level"
                            progress={10}
                            stats={10000}
                            centerIcon={<FaMinus />}
                        />
                    </Stack>
                </Group>

                <Stack
                    spacing={"xs"}
                    sx={(theme) => ({
                        flexGrow: 1,
                    })}>
                    <Title order={3}>News</Title>
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
