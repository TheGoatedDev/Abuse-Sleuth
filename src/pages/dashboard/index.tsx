import type { GetStaticProps, NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";

const Home: NextPage = () => {
    return <LayoutDashboard></LayoutDashboard>;
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default Home;
