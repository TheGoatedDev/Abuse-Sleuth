import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Center, Checkbox, Divider, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { AIPDB_Report } from "@prisma/client";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { isIPAddress } from "../lib/utils/regexTest";

interface PropsType {
    setResult: Dispatch<SetStateAction<AIPDB_Report | null>>;
}

const IPScanForm: React.FC<PropsType> = ({ setResult }) => {
    const form = useForm({
        initialValues: {
            ipAddress: "",
            ignoreCache: false,
        },
        validationRules: {
            ipAddress: (value) => isIPAddress(value),
        },
    });

    const onScanIPBtnClick = async () => {
        const res = await axios.get("/api/v1/scanip", {
            params: {
                ipAddress: form.values.ipAddress,
                ignoreCache: form.values.ignoreCache,
            },
        });

        const result = res.data.data;
        setResult(result);
    };

    return (
        <form
            onSubmit={form.onSubmit((values) => {
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
                <Divider />
                <Checkbox
                    ml="xl"
                    label="Ignore Cache"
                    {...form.getInputProps("ignoreCache")}
                />
            </Center>
        </form>
    );
};

export default IPScanForm;
