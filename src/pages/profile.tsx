import LayoutStandard from "@components/layouts/LayoutStandard";
import { Box, Center, Code, Group, Text } from "@mantine/core";
import { firebaseAuth } from "@services/firebase";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile: NextPage = () => {
    const [user, loading, _error] = useAuthState(firebaseAuth);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (user) {
                //const token = await user.getIdToken(true);
                const token = await firebaseAuth.currentUser?.getIdToken(true);
                setToken(token ?? "");
            }
        })();
    }, [user, loading]);

    return (
        <LayoutStandard>
            <Center>
                <Group direction="column">
                    <Text>{user?.email}</Text>

                    <Box style={{ width: "300px" }}>
                        <Code block>{token}</Code>
                    </Box>
                </Group>
            </Center>
        </LayoutStandard>
    );
};

export default Profile;
