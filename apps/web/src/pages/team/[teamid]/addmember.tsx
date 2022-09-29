import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button,
    Divider,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { useForm } from "@abuse-sleuth/ui/hooks";
import { zodResolver } from "@abuse-sleuth/ui/shared";

import { Layout } from "@components/dashboard/layouts";

// TODO: Make this a Model, a entire page is not needed.

const TeamAddMember: NextPage = () => {
    const router = useRouter();

    const teamId = router.query.teamid as string;

    const addUserToTeamMutation =
        trpcClient.teams.members.addMember.useMutation();

    const form = useForm({
        initialValues: {
            teamId: teamId,
            userEmail: "",
        },
        validate: zodResolver(
            z.object({
                userEmail: z.string().email(),
            })
        ),
    });

    return (
        <Layout>
            <Group position="apart">
                <Title>Add Member</Title>
            </Group>
            <Divider my="md" />
            <Stack>
                <Paper shadow={"md"} withBorder p="md">
                    <form
                        onSubmit={form.onSubmit((values) => {
                            addUserToTeamMutation.mutate({
                                teamId: values.teamId,
                                userEmail: values.userEmail,
                            });
                        })}>
                        <Stack>
                            {addUserToTeamMutation.isError && (
                                <Text color={"red"}>
                                    {addUserToTeamMutation.error.message}
                                </Text>
                            )}
                            <TextInput
                                label="Email"
                                {...form.getInputProps("userEmail")}
                            />
                            <Button type="submit">Submit</Button>
                            {addUserToTeamMutation.isSuccess && (
                                <Text color={"green"}>It WORKED</Text>
                            )}
                        </Stack>
                    </form>
                </Paper>
            </Stack>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamAddMember;
