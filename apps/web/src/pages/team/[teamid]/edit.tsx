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
    Title
} from "@abuse-sleuth/ui/components/atoms";
import { useForm } from "@abuse-sleuth/ui/hooks";
import { zodResolver } from "@abuse-sleuth/ui/shared";

import { Layout } from "@components/dashboard/layouts";

// TODO: Make this a Model, a entire page is not needed.

const TeamEdit: NextPage = () => {
    const router = useRouter();

    const teamId = router.query.teamid as string;

    const trpcContext = trpcClient.useContext()
    const editTeam =
        trpcClient.teams.edit.useMutation({
            onSuccess() {
                trpcContext.teams.get.invalidate({ teamId})
                trpcContext.teams.getAllSelf.invalidate()
                trpcContext.users.getActiveTeamSelf.invalidate()
            }
        });

    const form = useForm({
        initialValues: {
            teamId: teamId,
            teamName: "",
        },
        validate: zodResolver(
            z.object({
                teamName: z.string(),
            })
        ),
    });

    return (
        <Layout>
            <Group position="apart">
                <Title>Edit</Title>
            </Group>
            <Divider my="md" />
            <Stack>
                <Paper shadow={"md"} withBorder p="md">
                    <form
                        onSubmit={form.onSubmit((values) => {
                            editTeam.mutate({
                                teamId: values.teamId,
                                data: {
                                    teamName: values.teamName
                                }
                            });
                        })}>
                        <Stack>
                            {editTeam.isError && (
                                <Text color={"red"}>
                                    {editTeam.error.message}
                                </Text>
                            )}
                            <TextInput
                                label="Team name"
                                {...form.getInputProps("teamName")}
                            />
                            <Button type="submit">Submit</Button>
                            {editTeam.isSuccess && (
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

export default TeamEdit;
