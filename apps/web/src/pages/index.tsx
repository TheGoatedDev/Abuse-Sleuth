import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Link from "next/link";

import { StyledLayout } from "@abuse-sleuth/ui";
import {
    Button,
    Group,
    SimpleGrid,
    Title,
    useMantineTheme,
    useMediaQuery,
    Text,
    Stack,
} from "@abuse-sleuth/ui/mantine";

const Home: NextPage = () => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

    const { user, isLoading } = useUser();

    return (
        <StyledLayout>
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

                        {!user && !isLoading ? (
                            <Link passHref href={"/api/auth/login"}>
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
                            <Link passHref href={"/dashboard"}>
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
        </StyledLayout>
    );
};

export default Home;
