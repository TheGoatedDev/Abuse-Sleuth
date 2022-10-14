import type { GetServerSideProps, NextPage } from "next";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { Title } from "@abuse-sleuth/ui/components/atoms";

import { Layout } from "@components/dashboard/layouts";

// TODO: Flesh Out the Page

const ReportIndex: NextPage = () => {
    return (
        <Layout>
            <Title>Your Reports</Title>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default ReportIndex;
