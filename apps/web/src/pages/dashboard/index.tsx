import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { Title } from "@abuse-sleuth/ui/components/atoms";

import { Layout } from "@components/dashboard/layouts";

const Dashboard: NextPage = () => {
    return (
        <Layout>
            <Title>OOF</Title>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default Dashboard;
