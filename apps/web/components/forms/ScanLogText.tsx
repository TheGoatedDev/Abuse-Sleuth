import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import sendLogToAPI from "@libs/api/helper/sendLogToAPI";
import { scanLogSchema } from "@libs/validationSchemas/scanLogSchema";

import { Alert, Textarea, Button, Text } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";

const ScanLogText: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const scanTextForm = useForm({
        initialValues: {
            ipAddresses: "",
        },
        validate: joiResolver(scanLogSchema),
    });

    const onSubmit = async (values: { ipAddresses: string }) => {
        setLoading(true);
        const allIPs = values.ipAddresses.match(
            /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g
        );

        const allUniqueIPs = [...new Set(allIPs)];

        scanTextForm.setFieldValue(
            "ipAddresses",
            allUniqueIPs?.join(", ") ?? ""
        );
        //setResult(`Total Unique IPs: ${allUniqueIPs?.length}`);

        const res = await sendLogToAPI(allUniqueIPs);

        setResult(res);

        setLoading(false);
    };

    return (
        <>
            {result !== "" && (
                <Alert
                    title="Success!"
                    color={"green"}
                    mb="xs"
                    icon={<FontAwesomeIcon icon={["fas", "circle-check"]} />}>
                    {result}
                </Alert>
            )}
            <form
                onSubmit={scanTextForm.onSubmit((values) => onSubmit(values))}>
                <Textarea
                    label={
                        <>
                            <Text>IP Addresses</Text>
                            <Text size="xs" color="dimmed">
                                IP addresses should be spaced using space, comma
                                or newline
                            </Text>
                        </>
                    }
                    placeholder="xxx.xxx.xxx.xxx, xxx.xxx.xxx.xxx, xxx.xxx.xxx.xxx"
                    mb={"md"}
                    {...scanTextForm.getInputProps("ipAddresses")}
                />
                <Button type="submit" loading={loading} fullWidth>
                    Check
                </Button>
            </form>
        </>
    );
};

export default ScanLogText;
