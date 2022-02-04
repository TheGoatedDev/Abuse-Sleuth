import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";

const Home: NextPage = () => {
    return (
        <ProtectedComponent authRequired redirect="/login">
            <LayoutDashboard></LayoutDashboard>
        </ProtectedComponent>
    );
};

export default Home;
