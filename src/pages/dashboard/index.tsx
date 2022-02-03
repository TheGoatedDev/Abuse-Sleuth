import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import useRedirectIfNotAuth from "@hooks/useRedirectIfNotAuth";

const Home: NextPage = () => {
    useRedirectIfNotAuth({ redirectTo: "/login" });
    return <LayoutDashboard></LayoutDashboard>;
};

export default Home;
