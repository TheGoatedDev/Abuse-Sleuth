import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";

const Home: NextPage = () => {
    const [user, loading, _error] = useAuthState(firebaseAuth);

    return (
        <ProtectedComponent
            authRequired
            redirect="/login"
            user={user}
            loading={loading}
        >
            <LayoutDashboard></LayoutDashboard>
        </ProtectedComponent>
    );
};

export default Home;
