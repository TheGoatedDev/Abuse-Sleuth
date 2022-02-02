import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import { supabaseAdmin } from "@services/supabase/supabaseAdmin";

const Home: NextPage = () => {
    return <LayoutDashboard></LayoutDashboard>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { user } = await supabaseAdmin.auth.api.getUserByCookie(context.req);

    if (!user) {
        return {
            props: {},
            redirect: {
                destination: "/login",
            },
        };
    }

    return {
        props: {},
    };
};

export default Home;
