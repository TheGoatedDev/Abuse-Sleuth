import type { GetServerSideProps, NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import { redirectIfNoAuth } from "@libs/helpers/redirectIfNoAuth";

const DashboardHome: NextPage = () => {
    return <LayoutDashboard></LayoutDashboard>;
};

export default DashboardHome;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await redirectIfNoAuth(context);
};
