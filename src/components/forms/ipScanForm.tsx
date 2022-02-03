import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Center, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
import { isIPAddress } from "@libs/utils/regexTest";
import { createIPProfile } from "@services/firebase/firestore/queries/ipProfile/createIPProfile";

interface PropsType {
    setResult: Dispatch<SetStateAction<any | null>>;
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
        // const res = await axios.get("/api/v1/scanip", {
        //     params: {
        //         ipAddress: form.values.ipAddress,
        //     },
        // });

        // const result = res.data.data;
        // setResult(result);
        await createIPProfile(form.values.ipAddress);
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
