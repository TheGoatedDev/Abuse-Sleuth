import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import { DashboardLayout, StyledLayout } from "@abuse-sleuth/ui/layouts";

import DashboardNavbar from "@components/navigation/DashboardNavbar";
import { unstable_getServerSession, nextAuthOptions, requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { getProviders } from "@abuse-sleuth/authentication/nextjs/client";

const Dashboard: NextPage = () => {
    return <DashboardLayout navbar={<DashboardNavbar />}></DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = requireAuth

export default Dashboard;
