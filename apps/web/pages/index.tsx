import axios from "axios";
import Link from "next/link";

import {
    Box,
    Button,
    Container,
    Group,
    NavLink,
    Text,
    Title,
} from "@abuse-sleuth/ui";

import StyledHeader from "@components/nav/StyledHeader";
import StyledLayout from "@layouts/StyledLayout";

export default function Home() {
    return (
        <StyledLayout>
            <StyledHeader />

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
                                color: theme.colors.primary[2],
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
                                color: theme.colors.primary[2],
                            })}>
                            Scan, Block and Repeat!
                        </Text>

                        <Link passHref href={"/login"}>
                            <Button
                                component="a"
                                sx={(theme) => ({
                                    width: "150px",
                                    backgroundColor: theme.colors.primary[2],
                                    ":hover": {
                                        backgroundColor:
                                            theme.colors.primary[3],
                                    },
                                })}
                                mt="md"
                                radius={"xl"}>
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
