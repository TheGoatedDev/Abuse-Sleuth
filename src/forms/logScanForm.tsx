import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Center,
    Checkbox,
    Divider,
    Text,
    Textarea,
} from "@mantine/core";
import { useForm, usePagination } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";

const LogScanForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [scanAmount, setScanAmount] = useState(0);

    const form = useForm({
        initialValues: {
            ipAddresses: "",
            ignoreCache: false,
        },
    });

    const onScanLogBtnClick = async () => {
        setLoading(true);
        const res = await axios.post("/api/v1/scanlog", {
            ipAddresses: form.values.ipAddresses,
            ignoreCache: form.values.ignoreCache,
        });
        setLoading(false);

        setScanAmount(res.data.data.scanAmount);
    };

    return (
        <form
            onSubmit={form.onSubmit((values) => {
                onScanLogBtnClick();
            })}
        >
            <Textarea
                icon={<FontAwesomeIcon icon={faLaptop} />}
                placeholder="IP Addresses"
                {...form.getInputProps("ipAddresses")}
            />
            <Center mt="xs">
                <Button loading={loading} type="submit">
                    Scan Log
                </Button>
                <Divider />
                <Checkbox
                    ml="xl"
                    label="Ignore Cache"
                    {...form.getInputProps("ignoreCache")}
                />
            </Center>
            {scanAmount > 0 ? (
                <Text color="dimmed">Amount Scanned: {scanAmount}</Text>
            ) : (
                ""
            )}
        </form>
    );
};

export default LogScanForm;
