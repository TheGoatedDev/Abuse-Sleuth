import type { NextPage } from "next";
import Link from "next/link";

import {
    Button,
    Group,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { useMantineTheme, useMediaQuery } from "@abuse-sleuth/ui/hooks";

//import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import Navbar from "@components/main/features/Navbar";
import { Layout } from "@components/main/layouts";
import routes from "@utils/routes";

const Home: NextPage = () => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

    //const { data, status } = useSession();

    return (
        <Layout>
            <Navbar />
            <Group
                position="center"
                sx={(theme) => ({
                    height: "100vh",
                })}>
                <SimpleGrid cols={isMobile ? 1 : 2}>
                    <Stack justify={"center"} spacing={0} p="xl">
                        <Title order={2}>Welcome to</Title>
                        <Title
                            sx={(theme) => ({
                                color: theme.colors.violet[6],
                            })}>
                            Abuse Sleuth
                        </Title>
                        <Title order={3}>
                            Domain/IP Analysis and Aggregration SaaS
                        </Title>
                        <Text>
                            Take one centralised application, several analytical
                            data sources and one intrutive interface and you
                            have Abuse Sleuth the ultimate all-in-one package.
                        </Text>
                        <Text
                            mt={"md"}
                            weight={"bold"}
                            sx={(theme) => ({
                                color: theme.colors.violet[6],
                            })}>
                            Scan, Block and Repeat!
                        </Text>

                        {true ? (
                            <Link passHref href={routes.auth.login}>
                                <Button
                                    component="a"
                                    sx={(theme) => ({
                                        width: "150px",
                                        backgroundColor: theme.colors.violet[6],
                                        ":hover": {
                                            backgroundColor:
                                                theme.colors.violet[7],
                                        },
                                    })}
                                    mt="md">
                                    Join Now!
                                </Button>
                            </Link>
                        ) : (
                            <Link passHref href={routes.dashboard.home}>
                                <Button
                                    component="a"
                                    sx={(theme) => ({
                                        width: "150px",
                                        backgroundColor: theme.colors.violet[6],
                                        ":hover": {
                                            backgroundColor:
                                                theme.colors.violet[7],
                                        },
                                    })}
                                    mt="md">
                                    View Dashboard
                                </Button>
                            </Link>
                        )}
                    </Stack>

                    {!isMobile && (
                        <Group position="center">
                            <img
                                src="/logo.svg"
                                width={"350px"}
                                alt="Abuse Sleuth Logo"
                            />
                        </Group>
                    )}
                </SimpleGrid>
            </Group>
        </Layout>
    );
};

export default Home;
