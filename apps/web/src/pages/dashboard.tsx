import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Link from "next/link";

import { StyledLayout } from "@abuse-sleuth/ui";
import {
    Button,
    Group,
    SimpleGrid,
    Title,
    useMantineTheme,
    useMediaQuery,
    Text,
    Stack,
} from "@abuse-sleuth/ui/mantine";

const Home: NextPage = () => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

    const { user, isLoading } = useUser();

    return (
        <StyledLayout>
            <Group
                position="center"
                sx={(theme) => ({
                    height: "100vh",
                })}>
                <pre>{JSON.stringify(user, null, 4)}</pre>
                <Link passHref href={"/api/auth/login"}>
                    <Button
                        component="a"
                        sx={(theme) => ({
                            width: "150px",
                            backgroundColor: theme.colors.violet[6],
                            ":hover": {
                                backgroundColor: theme.colors.violet[7],
                            },
                        })}
                        mt="md">
                        Login
                    </Button>
                </Link>
                <Link passHref href={"/api/auth/logout"}>
                    <Button
                        component="a"
                        color={"red"}
                        sx={(theme) => ({
                            width: "150px",
                        })}
                        mt="md">
                        Logout
                    </Button>
                </Link>
            </Group>
        </StyledLayout>
    );
};

export default Home;
