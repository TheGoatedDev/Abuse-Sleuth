import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
    Alert,
    Button,
    Center,
    Divider,
    Group,
    Paper,
    PasswordInput,
    Space,
    Text,
    TextInput,
    Title,
} from "@abuse-sleuth/ui";

import DefaultLayout from "@layouts/DefaultLayout";

import { useForm } from "@mantine/form";

type IFormData = {
    email: string;
    password: string;
    csrfToken: string;
    apiError: string;
};

const Login = ({ csrfToken }) => {
    const router = useRouter();

    const [formResp, setFormResp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <DefaultLayout>
            <Center
                sx={(theme) => ({
                    height: "calc(100vh - 64px)",
                })}>
                <Paper
                    withBorder
                    p={"md"}
                    shadow={"md"}
                    sx={(theme) => ({ width: "400px" })}>
                    <Center my="md">
                        <img src={"/logo.svg"} alt={"Logo"} width={"15%"} />
                    </Center>
                    <Title align="center" order={2}>
                        Login to your account
                    </Title>
                    <Text mb="sm" size="sm" align="center">
                        Start locking out those malicous actors now!
                    </Text>

                    <Group>
                        <Button
                            variant="default"
                            color={"dark"}
                            fullWidth
                            leftIcon={
                                <FontAwesomeIcon
                                    icon={["fab", "google"]}
                                    size={"lg"}
                                />
                            }
                            onClick={() => {
                                signIn("google");
                            }}
                            disabled>
                            Login with Google
                        </Button>
                        <Button
                            variant="default"
                            color={"dark"}
                            fullWidth
                            leftIcon={
                                <FontAwesomeIcon
                                    icon={["fab", "github"]}
                                    size={"lg"}
                                />
                            }
                            onClick={() => {
                                signIn("github");
                            }}>
                            Login with Github
                        </Button>
                    </Group>
                </Paper>
            </Center>
        </DefaultLayout>
    );
};

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession({ req: context.req });

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            csrfToken: await getCsrfToken(),
        },
    };
}
