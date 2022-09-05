import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { DashboardLayout } from "@abuse-sleuth/ui/layouts";

import DashboardNavbar from "@components/navigation/DashboardNavbar";

const Dashboard: NextPage = () => {
    return <DashboardLayout navbar={<DashboardNavbar />}></DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = requireAuth;

export default Dashboard;
