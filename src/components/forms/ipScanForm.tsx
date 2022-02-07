import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Center, Code, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { isIPAddress } from "@libs/utils/regexTest";
import { useState } from "react";
import { firebaseAuth } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { scanIP } from "@services/api";

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
        <>
            <form
                onSubmit={form.onSubmit((_values) => {
                    onScanIPBtnClick();
                })}
            >
                <TextInput
                    icon={<FontAwesomeIcon icon={faLaptop} />}
                    placeholder="IP Address"
                    {...form.getInputProps("ipAddress")}
                />
                <Center mt="xs">
                    <Button type="submit">Scan IP</Button>
                </Center>
            </form>
            <Space h="sm" />
            <Code block>
                {result
                    ? "Successful: \n" + JSON.stringify(result, null, 2)
                    : "Waiting for result..."}
            </Code>
        </>
    );
};

export default IPScanForm;
