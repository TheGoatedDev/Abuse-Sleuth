import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Center, Code, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { isIPAddress } from "@libs/utils/regexTest";
import { createIPProfile } from "@services/firebase/firestore/queries/ipProfile/clientside/createIPProfile";
import { useState } from "react";
import { updateLastAccessIPProfile } from "@services/firebase/firestore/queries/ipProfile/clientside/updateLastAccessIPProfile";
import logger from "@libs/utils/logger";
import { getIPProfile } from "@services/firebase/firestore/queries/ipProfile/getIPProfile";
import { firebaseFirestore } from "@services/firebase";

const IPScanForm: React.FC = () => {
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
        // const res = await axios.get("/api/v1/scanip", {
        //     params: {
        //         ipAddress: form.values.ipAddress,
        //     },
        // });

        // const result = res.data.data;
        // setResult(result);
        try {
            await createIPProfile(form.values.ipAddress);
        } catch (error) {
            logger.error(error);
        } finally {
            form.reset();
            await updateLastAccessIPProfile(form.values.ipAddress);
            const data = await getIPProfile(
                form.values.ipAddress,
                firebaseFirestore
            );
            setResult(data);
        }
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
