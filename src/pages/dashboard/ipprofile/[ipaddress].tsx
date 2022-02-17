import type { GetServerSideProps, NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import { Group, Title, Text, Divider, Space } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAPIIPProfile } from "@services/api";

import BetterPaper from "@components/shared/BetterPaper";
import { useAuth } from "@contexts/AuthProvider";
import { redirectIfNoAuth } from "@libs/helpers/redirectIfNoAuth";

const IPProfileIndex: NextPage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const { ipaddress } = router.query;

    const [ipProfile, setIPProfile] = useState<IIPProfile>();

    useEffect(() => {
        (async () => {
            if (user) {
                setIPProfile(await getAPIIPProfile(ipaddress as string, user));
            }
        })();
    }, [user, ipaddress]);

    return (
        <LayoutDashboard>
            <Title align="center">IP Profile</Title>
            <Space h="sm" />
            <Group spacing={"md"}>
                <BetterPaper>
                    <Title order={2} align="center">
                        Details
                    </Title>
                    <Title order={6} align="center">
                        IP Address:
                    </Title>
                    <Text align="center">{ipProfile?.ipAddress}</Text>
                    <Title order={6} align="center">
                        First Seen:
                    </Title>
                    <Text align="center">{ipProfile?.createdAt}</Text>
                    <Title order={6} align="center">
                        Last Seen:
                    </Title>
                    <Text align="center">{ipProfile?.updatedAt}</Text>
                </BetterPaper>

                <BetterPaper>
                    {/*TODO: Create Endpoints for Statistics */}
                    <Title order={2} align="center">
                        Statistics
                    </Title>
                    <Title order={6} align="center">
                        Total Sightings:
                    </Title>
                    <Text align="center">
                        {Math.floor(Math.random() * 200)}
                    </Text>
                    <Title order={6} align="center">
                        Seen by:
                    </Title>

                    <Text align="center">
                        {Math.floor(Math.random() * 1000)} Users
                    </Text>
                    <Title order={6} align="center">
                        Seen by:
                    </Title>
                    <Text align="center">
                        {Math.floor(Math.random() * 1000)} Users
                    </Text>
                </BetterPaper>
            </Group>

            <Space h="md" />
            <Divider />
            <Space h="md" />

            <Title order={2} align="center">
                Data Provider Scan Results
            </Title>

            <Space h="md" />

            <BetterPaper>
                <Title order={3} align="center">
                    Abuse IP Database
                </Title>
            </BetterPaper>
        </LayoutDashboard>
    );
};

export default IPProfileIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await redirectIfNoAuth(context);
};
