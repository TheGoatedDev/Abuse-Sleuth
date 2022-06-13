import { Button, Group, Title, Text, useMantineTheme } from "@abuse-sleuth/ui";
import StyledLayout from "@components/layouts/StyledLayout";
import StyledHeader from "@components/navigation/StyledHeader";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    return (
        <StyledLayout>
            <StyledHeader/>

            <Group
                position="center"
                sx={(theme) => ({
                    height: "100vh",
                })}>
                <Group position="apart" grow mt={"xl"} px="xl">
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
                    <Group position="center">
                        <img
                            src="/logo.svg"
                            width={"350px"}
                            alt="Abuse Sleuth Logo"
                        />
                    </Group>
                </Group>
            </Group>
        </StyledLayout>
    );
}
