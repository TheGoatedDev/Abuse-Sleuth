import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { Group, Title, Text, Divider, Space } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPProfile } from "@prisma/client";
import { getAPIIPProfile } from "@services/api";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";
import BetterPaper from "@components/shared/BetterPaper";

const IPProfileIndex: NextPage = () => {
    const router = useRouter();
    const [user, loading, _error] = useAuthState(firebaseAuth);
    const { ipaddress } = router.query;

    const [ipProfile, setIPProfile] = useState<IPProfile>();

    useEffect(() => {
        (async () => {
            if (user) {
                setIPProfile(await getAPIIPProfile(ipaddress as string, user));
            }
        })();
    }, [user, ipaddress]);

    return (
        <ProtectedComponent
            authRequired
            redirect="/login"
            user={user}
            loading={loading}
        >
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
        </ProtectedComponent>
    );
};

export default IPProfileIndex;
