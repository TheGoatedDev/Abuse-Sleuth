import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { isIPv4 } from "is-ip";
import { useState } from "react";

import DashboardLayout from "@layouts/dashboardLayout";

import {
    Center,
    Paper,
    TextInput,
    Title,
    Text,
    Button,
    Alert,
    Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";

export default function CheckIP() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<any>("");

    const form = useForm({
        initialValues: {
            ipAddress: "",
        },
        validationRules: {
            ipAddress: (value) => isIPv4(value),
        },
        errorMessages: {
            ipAddress: "Please enter a valid IP address",
        },
    });

    const onSubmitForm = async (values: { ipAddress: string }) => {
        setLoading(true);
        const ipAddress = values.ipAddress;

        const isIP = isIPv4(ipAddress);

        if (!isIP) {
            setError("Invalid IP Address");
        } else {
            setError("");
        }

        try {
            const res = await axios.post("/api/scan/scanip", { ipAddress });
            setResult(
                <Text>
                    Redirecting or Click{" "}
                    <Anchor href={`/dashboard/ipprofile/${res.data.message}`}>
                        View
                    </Anchor>
                </Text>
            );
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <DashboardLayout>
            <Center
                sx={(theme) => ({
                    height: "100vh",
                })}>
                <Paper
                    withBorder
                    padding={"md"}
                    shadow={"md"}
                    sx={(theme) => ({ width: "400px" })}>
                    <Title align="center" order={2}>
                        Check an IP
                    </Title>
                    <Text mb="sm" size="sm" align="center">
                        This does count as a scan towards your quota.
                    </Text>
                    {result !== "" && (
                        <Alert
                            title="Success!"
                            color={"green"}
                            mb="xs"
                            icon={
                                <FontAwesomeIcon
                                    icon={["fas", "circle-check"]}
                                />
                            }>
                            {result}
                        </Alert>
                    )}
                    {error !== "" && (
                        <Alert
                            title="Error!"
                            color={"red"}
                            mb="xs"
                            icon={
                                <FontAwesomeIcon
                                    icon={["fas", "circle-xmark"]}
                                />
                            }>
                            {error}
                        </Alert>
                    )}
                    <form
                        onSubmit={form.onSubmit((values) =>
                            onSubmitForm(values)
                        )}>
                        <TextInput
                            label="IP Address"
                            placeholder="1.0.0.0 - 255.255.255.255"
                            mb={"md"}
                            required
                            {...form.getInputProps("ipAddress")}
                        />
                        <Button loading={loading} type="submit" fullWidth>
                            Check
                        </Button>
                    </form>
                </Paper>
            </Center>
        </DashboardLayout>
    );
}
