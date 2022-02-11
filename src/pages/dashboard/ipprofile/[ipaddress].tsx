import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import {
    Button,
    Center,
    Group,
    List,
    Paper,
    Space,
    Table,
    ThemeIcon,
    Title,
    Tooltip,
} from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";
import { useRouter } from "next/router";

const Reports_LogReportsID: NextPage = () => {
    const [user, loading, error] = useAuthState(firebaseAuth);
    const router = useRouter();

    const { ipaddress } = router.query;

    return (
        <ProtectedComponent authRequired redirect="/login">
            <LayoutDashboard>
                <Center>
                    <Title>{ipaddress}</Title>
                </Center>
            </LayoutDashboard>
        </ProtectedComponent>
    );
};

export default Reports_LogReportsID;
