import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { Title } from "@abuse-sleuth/ui/components/atoms";

import { Layout } from "@components/dashboard/layouts";

const TeamViewSingle: NextPage = () => {
    const router = useRouter();

    return (
        <Layout>
            <Title>Team: {router.query.teamid}</Title>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamViewSingle;
