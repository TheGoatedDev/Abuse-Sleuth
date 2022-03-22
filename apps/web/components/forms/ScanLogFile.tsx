import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Papa from "papaparse";
import { useState } from "react";

import {
    Alert,
    Button,
    Text,
    Group,
    NativeSelect,
    AlertBox,
} from "@abuse-sleuth/ui";

import sendLogToAPI from "@libs/api/helper/sendLogToAPI";

import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";

const ScanLogFile: React.FC = () => {
    const [csvContent, setCsvContent] = useState(null);
    const [result, setResult] = useState("");

    const selectHeaderForm = useForm({
        initialValues: {
            selectedHeader: "",
        },
    });

    const onDropFile = (file: File) => {
        const reader = new FileReader();

        reader.onloadend = async ({ target }) => {
            if (target == null) {
                return;
            }
            const csv = Papa.parse(target.result as string, { header: true });

            setCsvContent(csv);
        };

        reader.readAsText(file);
    };

    const onSelectedHeaderSubmit = async (values) => {
        console.time("Send Scan Log");
        const { selectedHeader } = values;

        const allItems = csvContent?.data.map((item) => item[selectedHeader]);
        const allValidIPs = allItems
            .join(", ")
            .match(
                /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g
            );

        const allUniqueIPs = [...new Set(allValidIPs)];

        const res = await sendLogToAPI(allUniqueIPs as string[]);

        setResult(res);

        setCsvContent(null);
        console.timeEnd("Send Scan Log");
    };

    return (
        <>
            {csvContent !== null ? (
                <form
                    onSubmit={selectHeaderForm.onSubmit((values) =>
                        onSelectedHeaderSubmit(values)
                    )}>
                    <NativeSelect
                        data={Object.keys(csvContent.data[0]).map((key) => ({
                            label: key,
                            value: key,
                        }))}
                        placeholder="Pick one"
                        label="Select Header"
                        required
                        {...selectHeaderForm.getInputProps("selectedHeader")}
                    />
                    <Button type="submit" mt={"md"} fullWidth>
                        Select Header
                    </Button>
                </form>
            ) : (
                <>
                    {result !== "" && (
                        <AlertBox
                            title="Success!"
                            color={"green"}
                            icon={
                                <FontAwesomeIcon
                                    icon={["fas", "circle-check"]}
                                />
                            }>
                            {result}
                        </AlertBox>
                    )}
                    <Dropzone
                        multiple={false}
                        onDrop={(files) => onDropFile(files[0])}
                        onReject={() => {}}>
                        {(status) => (
                            <Group
                                position="center"
                                spacing="xl"
                                direction="row">
                                <div>
                                    <FontAwesomeIcon
                                        size="3x"
                                        icon={["fas", "file"]}
                                    />
                                </div>
                                <div>
                                    <Text size="md">
                                        Drag and drop a file or click to select
                                        a File.
                                    </Text>

                                    <Text size="sm" color={"dimmed"}>
                                        Currently Support .csv files
                                    </Text>
                                </div>
                            </Group>
                        )}
                    </Dropzone>
                </>
            )}
        </>
    );
};

export default ScanLogFile;
