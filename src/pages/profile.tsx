import LayoutStandard from "@components/layouts/LayoutStandard";
import { useAuth } from "@contexts/AuthProvider";
import { redirectIfNoAuth } from "@libs/helpers/redirectIfNoAuth";
import { Box, Center, Code, Group, Text } from "@mantine/core";
import type { GetServerSideProps, NextPage } from "next";

const Profile: NextPage = () => {
    const { user, loading, error } = useAuth();

    return (
        <LayoutStandard>
            <Center>
                <Group direction="column">
                    <Text>{user?.email}</Text>

                    <Text>{loading ? "Loading..." : null}</Text>

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await redirectIfNoAuth(context);
};
