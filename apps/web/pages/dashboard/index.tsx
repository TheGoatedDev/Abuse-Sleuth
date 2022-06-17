import { FaArrowDown, FaArrowUp, FaMinus } from "react-icons/fa";

import { Group, SimpleGrid, Space, Stack, Text, Title } from "@abuse-sleuth/ui";

import DashboardLayout from "@components/layouts/DashboardLayout";
import StatsCard from "@components/statistics/StatsCard";
import DashboardUpdatesTable from "@components/tables/DashboardUpdatesTable";

export default function Home() {
    return (
        <DashboardLayout>
            <Title>Hello {"USER_NAME_HERE"}</Title>
            <Text color={"dimmed"}>Welcome Back!</Text>

            <Space h={"xs"} />

            <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <StatsCard label="Domain Quota" progress={75} stats={150} />
                <StatsCard label="IP Quota" progress={100} stats={1000} />
                <StatsCard label="Report Quota" progress={25} stats={1} />
            </SimpleGrid>

            <Space h="xl" />

            <Group
                sx={(theme) => ({
                    [theme.fn.smallerThan("sm")]: {
                        flexDirection: "column-reverse",
                    },
                })}
                position={"apart"}
                align="flex-start"
                noWrap>
                <Stack
                    style={{
                        flexGrow: 1,
                    }}>
                    <Title order={3}>Recent Updates</Title>
                    <DashboardUpdatesTable
                        updates={[
                            {
                                severity: "CRIT",
                                message:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie commodo quam vel auctor. Etiam risus lorem, rhoncus ut justo non, mattis consectetur lacus. Praesent magna urna, pulvinar in diam tempor, pharetra luctus purus.",
                            },
                            {
                                severity: "WARN",
                                message:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie commodo quam vel auctor. Etiam risus lorem, rhoncus ut justo non, mattis consectetur lacus. Praesent magna urna, pulvinar in diam tempor, pharetra luctus purus.",
                            },
                            {
                                severity: "INFO",
                                message:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie commodo quam vel auctor. Etiam risus lorem, rhoncus ut justo non, mattis consectetur lacus. Praesent magna urna, pulvinar in diam tempor, pharetra luctus purus.",
                            },
                        ]}
                    />
                </Stack>
                <Stack
                    sx={(theme) => ({
                        minWidth: "300px",
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
        </DashboardLayout>
    );
}
