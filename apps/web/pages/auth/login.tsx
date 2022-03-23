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

    const form = useForm<IFormData>({
        initialValues: {
            email: "",
            password: "",
            csrfToken: csrfToken,
            apiError: "",
        },
    });

    const login = async (data: IFormData) => {
        console.log("Logging In...");
        setLoading(true);
        setFormResp("");
        signIn<"credentials">("credentials", { ...data, redirect: false }).then(
            (res) => {
                if (!res.error) {
                    setFormResp("Logged In Successfully!");
                    router.push("/");
                } else {
                    form.setFieldError("apiError", res.error);
                }
                setLoading(false);
            }
        );
    };

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

                    <form onSubmit={form.onSubmit(login)}>
                        {form.errors.apiError && (
                            <Alert
                                title="Error!"
                                color={"red"}
                                mb="xs"
                                icon={
                                    <FontAwesomeIcon
                                        icon={["fas", "circle-xmark"]}
                                    />
                                }>
                                {form.errors.apiError}
                            </Alert>
                        )}
                        {formResp !== "" && (
                            <Alert
                                title="Success!"
                                color={"green"}
                                mb="xs"
                                icon={
                                    <FontAwesomeIcon
                                        icon={["fas", "circle-check"]}
                                    />
                                }>
                                {formResp}, Redirecting!
                            </Alert>
                        )}
                        <TextInput
                            mb={"xs"}
                            name="email"
                            label="Email"
                            required
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            mb={"xs"}
                            name="password"
                            label="Password"
                            required
                            {...form.getInputProps("password")}
                        />
                        <input
                            defaultValue={csrfToken || undefined}
                            type="hidden"
                            hidden
                            {...form.getInputProps("csrfToken")}
                        />
                        <Space h="md" />

                        <Button
                            type="submit"
                            color={"green"}
                            fullWidth
                            loading={loading}>
                            Login
                        </Button>
                    </form>

                    <Divider label="OR" labelPosition="center" my="sm" />
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
                            disabled>
                            Login with Github
                        </Button>
                    </Group>
                    <Space h="lg" />
                    <Group position="center">
                        <Text size="sm">Don&apos;t have an account?</Text>
                        <Link href="/auth/signup" passHref>
                            <Text size="sm" variant="link" component="a">
                                Create One.
                            </Text>
                        </Link>
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
