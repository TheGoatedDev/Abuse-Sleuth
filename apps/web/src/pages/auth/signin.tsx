import { GetServerSideProps, NextPage } from "next";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Link from "next/link";

import {
    nextAuthOptions,
    unstable_getServerSession,
} from "@abuse-sleuth/authentication/nextjs";
import { StyledLayout } from "@abuse-sleuth/ui";
import {
    Group,
    Paper,
    Stack,
    Title,
    Button,
    Anchor,
    Text
} from "@abuse-sleuth/ui/components";
import {
    MantineColor
} from "@abuse-sleuth/ui/types"
import { IconBrandGithub, IconBrandGoogle } from "@abuse-sleuth/ui/icons";

import StyledHeader from "@components/navigation/StyledHeader";

const NameIconConversion: Record<
    string,
    {
        icon: JSX.Element;
        color: MantineColor;
    }
> = {
    google: {
        icon: <IconBrandGoogle />,
        color: "blue",
    },
    github: {
        icon: <IconBrandGithub />,
        color: "indigo",
    },
};

const SignIn: NextPage<{ providers: Record<string, ClientSafeProvider> }> = ({
    providers,
}) => {
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
                            <Title order={2}>Welcome back to</Title>
                            <Title
                                sx={(theme) => ({
                                    color: theme.colors.violet[6],
                                })}>
                                Abuse Sleuth
                            </Title>
                            <Text color={"dimmed"}>
                                Sign in to your Account below.
                            </Text>
                        </Stack>
                        <Stack>
                            {Object.values(providers).map((provider) => {
                                const settings =
                                    NameIconConversion[provider.id];
                                return (
                                    <Button
                                        key={provider.name}
                                        variant={"light"}
                                        color={settings.color}
                                        onClick={() => signIn(provider.id)}
                                        leftIcon={settings.icon}>
                                        Sign in with {provider.name}
                                    </Button>
                                );
                            })}
                        </Stack>
                        <Group position="center">
                            <Text color={"dimmed"}>
                                Don&apos;t have an account?
                            </Text>
                            <Link href={"/register"} passHref>
                                <Anchor color={"violet"}>Sign up</Anchor>
                            </Link>
                        </Group>
                    </Stack>
                </Paper>
            </Group>
        </StyledLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        nextAuthOptions
    );
    if (session) {
        return {
            redirect: {
                destination: "/dashboard",
            },
            props: {},
        };
    }

    const providers = await getProviders();
    return {
        props: { providers },
    };
};

export default SignIn;
