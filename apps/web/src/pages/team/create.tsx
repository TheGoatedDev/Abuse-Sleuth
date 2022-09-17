import type { GetServerSideProps, NextPage } from "next";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Group,
    SimpleGrid,
    Skeleton,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { StatsCard } from "@abuse-sleuth/ui/components/compounds";

import { Layout } from "@components/dashboard/layouts";

const TeamIndex: NextPage = () => {
    return (
        <Layout>
            <Title>Create new Team</Title>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamIndex;
