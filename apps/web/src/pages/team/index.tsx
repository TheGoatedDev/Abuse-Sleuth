import type { GetServerSideProps, NextPage } from "next";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { Title } from "@abuse-sleuth/ui/components/atoms";

import { Layout } from "@components/dashboard/layouts";

// TODO: Flesh Out the Page

const TeamIndex: NextPage = () => {
    return (
        <Layout>
            <Title>Your Teams</Title>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamIndex;
