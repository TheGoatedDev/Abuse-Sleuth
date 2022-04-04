import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Joi from "joi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GenericHTTPResponse } from "types/http";

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

import DefaultLayout from "@layouts/DefaultLayout";
import { ROUTES } from "@libs/configs/routes";

import { joiResolver, useForm } from "@mantine/form";

type IFormData = {
    email: string;
};

const magicLinkSchema = Joi.object({
    email: Joi.string()
        .email({
            tlds: false,
        })
        .required(),
});

const Login = () => {
    const router = useRouter();

    const [result, setResult] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const magicLinkForm = useForm<IFormData>({
        initialValues: {
            email: "",
        },
        schema: joiResolver(magicLinkSchema),
    });

    const magicLinkFormSubmit = async (data: IFormData) => {
        setLoading(true);
        setError("");
        setResult("");
        const res = await fetch(ROUTES.api.auth.magicLinkSend, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resData: GenericHTTPResponse = await res.json();
        if (resData.ok === true) {
            setResult(resData.data);
        } else {
            setError(JSON.stringify(resData.error));
        }
        setLoading(false);
    };

    useEffect(() => {
        (async () => {
            if (router.query.token) {
                const token = router.query.token as string;
                const res = await fetch(ROUTES.api.auth.magicLinkAuthenticate, {
                    method: "POST",
                    body: JSON.stringify({ token }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (data.ok === true) {
                    setResult("Logged in!");
                    router.push(ROUTES.home);
                } else {
                    setError(data.error);
                }
            }
        })();
    }, [router]);

    return (
        <DefaultLayout>
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
                        <img src={"/logo.svg"} alt={"Logo"} width={"15%"} />
                    </Center>
                    <Title align="center" order={2}>
                        Login to your account
                    </Title>
                    <Text mb="sm" size="sm" align="center">
                        Start locking out those malicous actors now!
                    </Text>
                    {result !== "" && (
                        <AlertBox
                            title="Success!"
                            color={"green"}
                            icon={
                                <FontAwesomeIcon
                                    icon={["fas", "circle-check"]}
                                />
                            }>
                            {result}
                        </AlertBox>
                    )}
                    {error !== "" && (
                        <AlertBox
                            title="Error!"
                            color={"red"}
                            icon={
                                <FontAwesomeIcon
                                    icon={["fas", "circle-xmark"]}
                                />
                            }>
                            {error}
                        </AlertBox>
                    )}
                    <form
                        onSubmit={magicLinkForm.onSubmit((values) => {
                            magicLinkFormSubmit(values);
                        })}>
                        <TextInput
                            required
                            type="email"
                            label="Email"
                            placeholder="your@email.com"
                            {...magicLinkForm.getInputProps("email")}
                        />
                        <Button
                            type="submit"
                            mt="sm"
                            fullWidth
                            loading={loading}>
                            Send Magic Link
                        </Button>
                    </form>

                    <Divider label="OR" labelPosition="center" />

                    <Group>
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
                            onClick={() => {}}
                            disabled>
                            Login with Github
                        </Button>
                    </Group>
                </Paper>
            </Center>
        </DefaultLayout>
    );
};

export default Login;
