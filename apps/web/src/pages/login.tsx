import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import { z } from "zod";

import {
    Button,
    Group,
    Title,
    Text,
    Paper,
    Stack,
    TextInput,
    PasswordInput,
    Divider,
    Checkbox,
    Anchor,
    StyledLayout,
} from "@abuse-sleuth/ui";

import StyledHeader from "@components/navigation/StyledHeader";
import { trpc } from "@utils/trpc/reactQueryHooks";

export default function Login() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        schema: zodResolver(
            z.object({
                email: z.string().email({ message: "Invalid Email" }),
                password: z.string().min(8, {
                    message: "Password must be atleast 8 characters",
                }),
            })
        ),
    });

    const mutation = trpc.useMutation(["auth:login"]);

    useEffect(() => {
        if (!mutation.isLoading) {
            if (mutation.isSuccess) {
                showNotification({
                    title: "Login Successful",
                    message: "Redirecting to Dashboard",
                    color: "green",
                    autoClose: 2000,
                    onClose: () => {
                        router.push("/dashboard");
                    },
                });
            }

            if (mutation.isError) {
                showNotification({
                    title: "Issue Occurred",
                    message: mutation.error?.message,
                    color: "red",
                });
            }
        }
    }, [
        mutation.isLoading,
        mutation.isError,
        mutation.isSuccess,
        mutation.data,
        mutation.error,
        router,
    ]);

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
                        <Stack spacing={0}>
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

                        <form
                            onSubmit={form.onSubmit((values) => {
                                console.log(values);
                                mutation.mutate({
                                    email: values.email,
                                    password: values.password,
                                });
                            })}>
                            <TextInput
                                required
                                label="Email"
                                placeholder="Enter your Email"
                                {...form.getInputProps("email")}
                            />

                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Enter your Password"
                                {...form.getInputProps("password")}
                            />

                            <Group position="center" mt="lg">
                                <Button
                                    loading={mutation.isLoading}
                                    color={"violet"}
                                    fullWidth
                                    type="submit">
                                    Login
                                </Button>
                            </Group>
                        </form>
                        <Divider label="OR" labelPosition="center" />
                        <Group position="center" grow>
                            <Button
                                disabled
                                color={"violet"}
                                rightIcon={<FaGoogle size={"24px"} />}>
                                Sign in with
                            </Button>
                            <Button
                                disabled
                                color={"violet"}
                                rightIcon={<FaMicrosoft size={"24px"} />}>
                                Sign in with
                            </Button>
                        </Group>
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
}
