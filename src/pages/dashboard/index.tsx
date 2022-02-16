import type { GetServerSideProps, NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import { checkSessionCookie } from "@services/firebase/auth/checkSessionCookie";

const DashboardHome: NextPage = () => {
    return <LayoutDashboard></LayoutDashboard>;
};

export default DashboardHome;

export const getServerSideProps: GetServerSideProps = async (context) => {
    // TODO: Create a seperate file for checking the session cookie and redirecting

    if (context.req.cookies.token !== undefined) {
        const user = await checkSessionCookie(context.req.cookies.token);

        if (user !== null) {
            return {
                props: {}, // will be passed to the page component as props
            };
        }
    }

    return {
        redirect: {
            destination: "/login",
            permanent: false,
        },
        props: {}, // will be passed to the page component as props
    };
};
