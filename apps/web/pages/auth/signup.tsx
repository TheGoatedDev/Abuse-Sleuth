import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
    Alert,
    Text,
    Button,
    Center,
    Divider,
    Paper,
    PasswordInput,
    Space,
    TextInput,
    Title,
    Group,
} from "@abuse-sleuth/ui";

import DefaultLayout from "@layouts/DefaultLayout";

import { useForm } from "@mantine/form";

type IFormData = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    apiError: string;
};

const Signup = () => {
    const router = useRouter();
    const [formResp, setFormResp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<IFormData>({
        initialValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            apiError: "",
        },
        validate: {
            passwordConfirm: (value, values) =>
                value === values.password
                    ? undefined
                    : "Passwords do not match",
        },
    });

    const handleErrors = async (resp: Response) => {
        if (!resp.ok) {
            const err = await resp.json();
            throw new Error(err.message);
        } else {
            return resp;
        }
    };

    const signUp = async (data: IFormData) => {
        console.log("Signing up...");
        setLoading(true);
        setFormResp("");
        await fetch("/api/auth/signup", {
            body: JSON.stringify({ ...data }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
            .then(handleErrors)
            .then(async (value) => {
                setFormResp((await value.json()).message);
                setLoading(false);
                form.reset();
                router.push("/auth/login");
            })
            .catch((err) => {
                form.setFieldError("apiError", err.message);
            });
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
                        Create your account
                    </Title>
                    <Text mb="sm" size="sm" align="center">
                        Start locking out those malicous actors now!
                    </Text>

                    <form onSubmit={form.onSubmit(signUp)}>
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
                                {formResp}, Redirecting!!
                            </Alert>
                        )}
                        <TextInput
                            mb={"xs"}
                            name="username"
                            label="Username"
                            required
                            {...form.getInputProps("username")}
                        />
                        <TextInput
                            mb={"xs"}
                            name="email"
                            label="Email"
                            required
                            onBlur={() => form.validateField("email")}
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            mb={"xs"}
                            name="password"
                            label="Password"
                            required
                            {...form.getInputProps("password")}
                        />
                        <PasswordInput
                            name="passwordConfirm"
                            label="Confirm Password"
                            mb={"md"}
                            required
                            {...form.getInputProps("passwordConfirm")}
                        />
                        <Button type="submit" fullWidth>
                            Create Account
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
                            Sign up with Google
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
                            Sign up with Github
                        </Button>
                    </Group>
                    <Space h="lg" />
                    <Group position="center">
                        <Text size="sm">Already got an account?</Text>
                        <Link href="/auth/login" passHref>
                            <Text size="sm" variant="link" component="a">
                                Login.
                            </Text>
                        </Link>
                    </Group>
                </Paper>
            </Center>
        </DefaultLayout>
    );
};

export default Signup;

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
        props: {},
    };
}
