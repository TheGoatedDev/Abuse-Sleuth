import { GetServerSideProps, NextPage } from "next";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Link from "next/link";

import {
    nextAuthOptions,
    unstable_getServerSession,
} from "@abuse-sleuth/authentication/nextjs";
import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { StyledLayout } from "@abuse-sleuth/ui";
import {
    Group,
    Paper,
    Stack,
    Title,
    Button,
    Anchor,
    Text,
} from "@abuse-sleuth/ui/components";
import { IconBrandGithub, IconBrandGoogle } from "@abuse-sleuth/ui/icons";
import { MantineColor } from "@abuse-sleuth/ui/types";

import StyledHeader from "@components/navigation/StyledHeader";

const NewUser: NextPage = () => {
    const { data: session } = useSession();
    return (
        <StyledLayout>
            <StyledHeader />

            <Group
                position="center"
                sx={(theme) => ({
                    height: "100vh",
                    width: "50%",
                    [theme.fn.smallerThan("sm")]: {
                        width: "100%",
                    },
                })}>
                <Paper
                    p="lg"
                    shadow={"lg"}
                    sx={(theme) => ({
                        width: "70%",
                        [theme.fn.smallerThan("md")]: {
                            width: "90%",
                        },
                    })}>
                    <Stack>
                        <Stack spacing={0} align="center">
                            <Title order={2}>
                                Hello {session?.user?.name},
                            </Title>
                            <Title
                                sx={(theme) => ({
                                    color: theme.colors.violet[6],
                                })}>
                                Abuse Sleuth
                            </Title>
                            <Title order={3}>is awaiting you!</Title>
                        </Stack>

                        <Group position="center">
                            <Link href={"/dashboard"} passHref>
                                <Anchor color={"violet"}>
                                    Click here for your Dashboard
                                </Anchor>
                            </Link>
                        </Group>
                    </Stack>
                </Paper>
            </Group>
        </StyledLayout>
    );
};

export default NewUser;
