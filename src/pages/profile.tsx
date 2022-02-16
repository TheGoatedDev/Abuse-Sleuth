import LayoutStandard from "@components/layouts/LayoutStandard";
import useServerSideAuthentication from "@hooks/useServerSideAuthentication";
import { Box, Center, Code, Group, Text } from "@mantine/core";
import type { NextPage } from "next";

const Profile: NextPage = () => {
    const { user, loading } = useServerSideAuthentication();

    return (
        <LayoutStandard>
            <Center>
                <Group direction="column">
                    <Text>{user?.email}</Text>

                    <Box style={{ width: "300px" }}>
                        <Code block>
                            <pre>{JSON.stringify(user, null, 4)}</pre>
                        </Code>
                    </Box>
                </Group>
            </Center>
        </LayoutStandard>
    );
};

export default Profile;
