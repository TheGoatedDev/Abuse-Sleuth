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
    useMantineTheme,
    MediaQuery,
    SimpleGrid,
    Paper,
    Stack,
    TextInput,
    PasswordInput,
    Box,
    Divider,
    Checkbox,
    Anchor,
    StyledLayout,
} from "@abuse-sleuth/ui";

import StyledHeader from "@components/navigation/StyledHeader";
import {
    removeLocalStorage,
    setLocalStorage,
} from "@utils/helpers/localStorage";
import { trpc } from "@utils/trpc/reactQueryHooks";

export default function Register() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },

        schema: zodResolver(
            z
                .object({
                    email: z.string().email({ message: "Invalid Email" }),
                    password: z.string().min(8, {
                        message: "Password must be atleast 8 characters",
                    }),
                    confirmPassword: z.string(),
                })
                .refine((data) => data.confirmPassword === data.password, {
                    path: ["confirmPassword"],
                    message: "Passwords don't match",
                })
        ),
    });

    const mutation = trpc.useMutation(["users:register"]);

    useEffect(() => {
        if (!mutation.isLoading) {
            if (mutation.isSuccess) {
                router.push(`/confirm?email=${form.values.email}`);
            } else {
                if (mutation.isError) {
                    showNotification({
                        title: "Issue Occured",
                        message: mutation.error?.message,
                        color: "red",
                    });
                }
            }
        }
    }, [
        mutation.isLoading,
        mutation.isError,
        mutation.isSuccess,
        form.values.email,
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
                            <Title order={2}>Welcome to</Title>
                            <Title
                                sx={(theme) => ({
                                    color: theme.colors.violet[6],
                                })}>
                                Abuse Sleuth
                            </Title>
                            <Text color={"dimmed"}>
                                Create your Account below.
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

                            <PasswordInput
                                required
                                label="Confirm Password"
                                placeholder="Confirm your Password"
                                {...form.getInputProps("confirmPassword")}
                            />

                            <Group position="center" mt="lg">
                                <Button
                                    loading={mutation.isLoading}
                                    color={"violet"}
                                    fullWidth
                                    type="submit">
                                    Register
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
                                Already have an account?
                            </Text>
                            <Link href={"/login"} passHref>
                                <Anchor color={"violet"}>Login</Anchor>
                            </Link>
                        </Group>
                    </Stack>
                </Paper>
            </Group>
        </StyledLayout>
    );
}
