import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sendLogToAPI from "@libs/api/helper/sendLogToAPI";
import { useState } from "react";

import { AlertBox } from "@abuse-sleuth/ui";
import { Alert, Textarea, Button, Text } from "@abuse-sleuth/ui";

import { scanLogSchema } from "@utils/validationSchemas/scanLogSchema";

import { joiResolver, useForm } from "@mantine/form";

const ScanLogText: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const scanTextForm = useForm({
        initialValues: {
            ipAddresses: "",
        },
    });

    const onSubmit = async (values) => {
        setLoading(true);
        const allIPs = values.ipAddresses.match(
            /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g
        );

        const allUniqueIPs = [...new Set(allIPs)] as string[];

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
                <AlertBox
                    title="Success!"
                    color={"green"}
                    icon={<FontAwesomeIcon icon={["fas", "circle-check"]} />}>
                    {result}
                </AlertBox>
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
