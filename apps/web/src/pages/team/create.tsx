import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { Button, TextInput, Title } from "@abuse-sleuth/ui/components/atoms";
import { useForm } from "@abuse-sleuth/ui/hooks";

import { Layout } from "@components/dashboard/layouts";
import routes from "@utils/routes";

const TeamCreate: NextPage = () => {
    const createNewTeamMutation = trpcClient.teams.createNewTeam.useMutation();

    const router = useRouter();

    const form = useForm({
        initialValues: {
            teamName: "",
        },
    });

    useEffect(() => {
        if (createNewTeamMutation.data) {
            router.push(
                routes.team.viewSingleTeam(createNewTeamMutation.data.id)
            );
        }
    });

    return (
        <Layout>
            <Title>Create new Team</Title>
            <form
                onSubmit={form.onSubmit((values) => {
                    createNewTeamMutation.mutate({
                        teamName: values.teamName,
                    });
                })}>
                <TextInput
                    label="Team Name"
                    {...form.getInputProps("teamName")}
                />
                <Button type="submit">Submit</Button>
            </form>
            <pre>{JSON.stringify(createNewTeamMutation.data, null, 4)}</pre>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamCreate;
