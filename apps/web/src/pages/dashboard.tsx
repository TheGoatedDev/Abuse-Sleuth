import type { NextPage } from "next";
import Link from "next/link";

import { DashboardLayout, StyledLayout } from "@abuse-sleuth/ui";
import { Button, Group } from "@abuse-sleuth/ui/mantine";

import DashboardNavbar from "@components/navigation/DashboardNavbar";

const Dashboard: NextPage = () => {
    return <DashboardLayout navbar={<DashboardNavbar />}></DashboardLayout>;
};

export default Dashboard;
