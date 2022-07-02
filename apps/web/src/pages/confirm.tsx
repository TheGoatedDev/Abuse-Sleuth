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
import { trpc } from "@utils/trpc/reactQueryHooks";

export default function Register() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: (router.query["email"] as string) || "Try Again",
            code: "",
        },

        schema: zodResolver(
            z.object({
                email: z.string().email({ message: "Invalid Email" }),
                code: z.string(),
            })
        ),
    });

    const mutation = trpc.useMutation(["users:confirm"]);

    useEffect(() => {
        if (!mutation.isLoading) {
            if (mutation.isSuccess) {
                showNotification({
                    title: "Confirmation Successful",
                    message: "Redirecting to Login",
                    autoClose: 2000,
                    onClose: () => {
                        router.push("/login");
                    },
                });
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
    }, [mutation.isLoading, mutation.isError, mutation.isSuccess]);

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
                                Confirm your Account below.
                            </Text>
                        </Stack>

                        <form
                            onSubmit={form.onSubmit((values) => {
                                console.log(values);
                                mutation.mutate({
                                    email: values.email,
                                    code: values.code,
                                });
                            })}>
                            <TextInput
                                required
                                label="Email"
                                placeholder="Enter your Email"
                                {...form.getInputProps("email")}
                            />
                            <TextInput
                                required
                                label="Code"
                                placeholder="Enter your Confirmation Code"
                                {...form.getInputProps("code")}
                            />

                            <Group position="center" mt="lg">
                                <Button
                                    loading={mutation.isLoading}
                                    color={"violet"}
                                    fullWidth
                                    type="submit">
                                    Confirm
                                </Button>
                            </Group>
                        </form>
                    </Stack>
                </Paper>
            </Group>
        </StyledLayout>
    );
}
