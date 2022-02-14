import { Button, Center, Code, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { isIPAddress } from "@libs/utils/regexTest";
import { useState } from "react";
import { firebaseAuth } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { scanIP } from "@services/api";
import { LaptopIcon } from "@icons";

const IPScanForm: React.FC = () => {
    const [user, loading, error] = useAuthState(firebaseAuth);

    const form = useForm({
        initialValues: {
            ipAddress: "",
        },
        validationRules: {
            ipAddress: (value) => isIPAddress(value),
        },
    });

    const [result, setResult] = useState<any>(null);

    const onScanIPBtnClick = async () => {
        const apiCall = await scanIP(form.values.ipAddress, user!);

        setResult(apiCall);
    };

    return (
        <Group direction="column" align={"center"}>
            <form
                onSubmit={form.onSubmit((_values) => {
                    onScanIPBtnClick();
                })}
            >
                <TextInput
                    icon={<LaptopIcon />}
                    placeholder="IP Address"
                    {...form.getInputProps("ipAddress")}
                />
                <Center mt="xs">
                    <Button type="submit">Scan IP</Button>
                </Center>
            </form>
            <Code block>
                {result
                    ? "Successful: \n" + JSON.stringify(result, null, 2)
                    : "Waiting for results..."}
            </Code>
        </Group>
    );
};

export default IPScanForm;
