import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import {
    Anchor,
    Group,
    Paper,
    Stack,
    Title,
} from "@abuse-sleuth/ui/components/atoms";

import Navbar from "@components/main/features/Navbar";
import { Layout } from "@components/main/layouts";
import Routes from "@utils/routes";

const NewUser: NextPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/dashboard");
        }, 2000);
    }, []);

    return (
        <Layout>
            <Navbar />

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
                            <Link href={Routes.dashboard.home} passHref>
                                <Anchor color={"violet"}>
                                    Click here for your Dashboard
                                </Anchor>
                            </Link>
                        </Group>
                    </Stack>
                </Paper>
            </Group>
        </Layout>
    );
};

export default NewUser;
