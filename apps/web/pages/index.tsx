import { Button, Group, Title, Text, useMantineTheme, MediaQuery, SimpleGrid } from "@abuse-sleuth/ui";
import StyledLayout from "@components/layouts/StyledLayout";
import StyledHeader from "@components/navigation/StyledHeader";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

export default function Home() {
    const theme = useMantineTheme()
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`)

    return (
        <StyledLayout>
            <StyledHeader/>

            <Group
                position="center"
                sx={(theme) => ({
                    height: "100vh",
                })}>
                <SimpleGrid cols={isMobile ? 1 : 2}>
                    <Group direction="column" spacing={0} p="xl">
                        <Title order={2}>Welcome to</Title>
                        <Title
                            sx={(theme) => ({
                                color: theme.colors.violet[6],
                            })}>
                            Abuse Sleuth
                        </Title>
                        <Title order={3}>
                            IP Analysis and Aggregration SaaS
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

                        <Link passHref href={"/login"}>
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
                                mt="md"
                                >
                                Join Now!
                            </Button>
                        </Link>
                    </Group>

                    {!isMobile && <Group position="center">
                        <img
                            src="/logo.svg"
                            width={"350px"}
                            alt="Abuse Sleuth Logo"
                        />
                    </Group>}

                </SimpleGrid>
            </Group>
        </StyledLayout>
    );
}
