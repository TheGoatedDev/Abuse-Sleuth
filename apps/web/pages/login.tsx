import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import {
    AlertBox,
    Button,
    Center,
    Divider,
    Group,
    Paper,
    Text,
    TextInput,
    Title,
} from "@abuse-sleuth/ui";

import DefaultLayout from "@components/layouts/DefaultLayout";
import StyledLayout from "@components/layouts/StyledLayout";
import StyledHeader from "@components/nav/StyledHeader";
import EnvConfig from "@utils/configs/env";

const Login = () => {
    return (
        <StyledLayout>
            <StyledHeader />
            <Center
                sx={(theme) => ({
                    height: "calc(100vh - 64px)",
                })}>
                <Paper
                    withBorder
                    p={"md"}
                    shadow={"md"}
                    sx={(theme) => ({ width: "400px" })}>
                    <Center my="md">
                        <img
                            src={"/logo.svg"}
                            alt={"Abuse Sleuth Logo"}
                            width={"20%"}
                        />
                    </Center>
                    <Title align="center" order={2}>
                        Login to your account
                    </Title>
                    <Text mb="sm" size="sm" align="center">
                        Start locking out those malicous actors now!
                    </Text>

                    <Group>
                        <Link
                            href={`https://test.stytch.com/v1/public/oauth/google/start?public_token=${EnvConfig.public.stytch.publicToken}`}
                            passHref>
                            <Button
                                variant="default"
                                color={"dark"}
                                fullWidth
                                leftIcon={
                                    <FontAwesomeIcon
                                        icon={["fab", "google"]}
                                        size={"lg"}
                                    />
                                }
                                component="a">
                                Login with Google
                            </Button>
                        </Link>
                        <Link
                            href={`https://test.stytch.com/v1/public/oauth/github/start?public_token=${EnvConfig.public.stytch.publicToken}`}
                            passHref>
                            <Button
                                variant="default"
                                color={"dark"}
                                fullWidth
                                leftIcon={
                                    <FontAwesomeIcon
                                        icon={["fab", "github"]}
                                        size={"lg"}
                                    />
                                }
                                component="a">
                                Login with Github
                            </Button>
                        </Link>
                    </Group>
                </Paper>
            </Center>
        </StyledLayout>
    );
};

export default Login;
