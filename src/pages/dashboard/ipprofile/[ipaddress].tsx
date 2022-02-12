import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { Center, Code, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPProfile } from "@prisma/client";
import { getAPIIPProfile } from "@services/api";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";

const IPProfileIndex: NextPage = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(firebaseAuth);
    const { ipaddress } = router.query;

    const [ipProfile, setIPProfile] = useState<IPProfile>();

    useEffect(() => {
        (async () => {
            if (user) {
                setIPProfile(await getAPIIPProfile(ipaddress as string, user));
            }
        })();
    }, [user, ipaddress]);

    return (
        <ProtectedComponent authRequired redirect="/login">
            <LayoutDashboard>
                <Center>
                    <Title>{ipaddress}</Title>
                </Center>
                <Code block>
                    <pre>{JSON.stringify(ipProfile, null, 4)}</pre>
                </Code>
            </LayoutDashboard>
        </ProtectedComponent>
    );
};

export default IPProfileIndex;
