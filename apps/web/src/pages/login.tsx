import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { FaGoogle, FaMicrosoft, FaPray } from "react-icons/fa";
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

export default function Pricing() {
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            keepLoggedIn: false,
        },

        schema: zodResolver(
            z.object({
                email: z.string().email({ message: "Invalid Email" }),
                password: z.string().min(8, {
                    message: "Password must be atleast 8 characters",
                }),
                keepLoggedIn: z.boolean().default(false),
            })
        ),
    });

    // TODO: MOVE REGISTRATION TO REGISTRATION PAGE
    const mutation = trpc.useMutation(["users:register"]);

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
                            <Text>{mutation.data?.username ?? ""}</Text>
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

                            <Checkbox
                                label="Keep me logged in"
                                color={"violet"}
                                mt="lg"
                                size="md"
                                {...form.getInputProps("keepLoggedIn")}
                            />

                            <Group position="center" mt="lg">
                                <Button
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
                                color={"violet"}
                                rightIcon={<FaGoogle size={"24px"} />}>
                                Sign in with
                            </Button>
                            <Button
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
