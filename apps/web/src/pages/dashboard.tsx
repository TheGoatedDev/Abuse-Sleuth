import type { NextPage } from "next";
import Link from "next/link";

import {
    useUser,
    withPageAuthRequired,
} from "@abuse-sleuth/authentication/nextjs";
import { StyledLayout } from "@abuse-sleuth/ui";
import { Button, Group } from "@abuse-sleuth/ui/mantine";

const Dashboard: NextPage = () => {
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

export default withPageAuthRequired(Dashboard);
