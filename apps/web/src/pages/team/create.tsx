import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { z } from "zod";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button,
    Group,
    Paper,
    Stack,
    TextInput,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { useForm } from "@abuse-sleuth/ui/hooks";
import { zodResolver } from "@abuse-sleuth/ui/shared";

import { Layout } from "@components/dashboard/layouts";
import routes from "@utils/routes";

// TODO: Make the Form Pretty

const TeamCreate: NextPage = () => {
    const createNewTeamMutation = trpcClient.teams.createNewTeam.useMutation();

    const router = useRouter();

    const form = useForm({
        initialValues: {
            teamName: "",
        },
        validate: zodResolver(
            z.object({
                teamName: z
                    .string()
                    .min(3, "Team Name must be at least 3 letters"),
            })
        ),
    });

    useEffect(() => {
        if (createNewTeamMutation.data) {
            router.push(routes.team.viewTeam(createNewTeamMutation.data.id));
        }
    });

    return (
        <Layout>
            <Title>Create new Team</Title>
            <Group>
                <Paper shadow={"md"} withBorder p="md">
                    <form
                        onSubmit={form.onSubmit((values) => {
                            createNewTeamMutation.mutate({
                                teamName: values.teamName,
                            });
                        })}>
                        <Stack>
                            <TextInput
                                label="Team Name"
                                {...form.getInputProps("teamName")}
                            />
                            <Button type="submit">Submit</Button>
                        </Stack>
                    </form>
                </Paper>
            </Group>
            <pre>{JSON.stringify(createNewTeamMutation.data, null, 4)}</pre>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamCreate;
