import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Center, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { AIPDBProfile } from "@prisma/client";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { isIPAddress } from "@lib/utils/regexTest";

interface PropsType {
    setResult: Dispatch<SetStateAction<AIPDBProfile | null>>;
}

const IPScanForm: React.FC<PropsType> = ({ setResult }) => {
    const form = useForm({
        initialValues: {
            ipAddress: "",
        },
        validationRules: {
            ipAddress: (value) => isIPAddress(value),
        },
    });

    const onScanIPBtnClick = async () => {
        const res = await axios.get("/api/v1/scanip", {
            params: {
                ipAddress: form.values.ipAddress,
            },
        });

        const result = res.data.data;
        setResult(result);
    };

    return (
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
    );
};

export default IPScanForm;
