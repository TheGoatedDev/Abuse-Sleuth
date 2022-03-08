import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Papa from "papaparse";
import { useState } from "react";

import DashboardLayout from "@layouts/dashboardLayout";
import sendLogToAPI from "@libs/api/helper/sendLogToAPI";

import {
    Button,
    Center,
    Group,
    Paper,
    Title,
    Text,
    Textarea,
    Divider,
    NativeSelect,
    Alert,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/hooks";

export default function ScanLog() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const [csvContent, setCsvContent] = useState(null);

    const scanTextForm = useForm({
        initialValues: {
            ipAddresses: "",
        },
        validationRules: {},
    });

    const selectHeaderForm = useForm({
        initialValues: {
            selectedHeader: "",
        },
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

    const onDropFile = (file: File) => {
        setLoading(true);

        const reader = new FileReader();

        reader.onloadend = async ({ target }) => {
            if (target == null) {
                return;
            }
            const csv = Papa.parse(target.result as string, { header: true });

            setCsvContent(csv);

            setLoading(false);
        };

        reader.readAsText(file);
    };

    const onSelectedHeaderSubmit = (values) => {
        const { selectedHeader } = values;

        const allItems = csvContent?.data.map((item) => item[selectedHeader]);
        const allValidIPs = allItems
            .join(", ")
            .match(
                /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g
            );

        const allUniqueIPs = [...new Set(allValidIPs)];

        scanTextForm.setFieldValue(
            "ipAddresses",
            allUniqueIPs?.join(", ") ?? ""
        );

        setCsvContent(null);
    };

    return (
        <DashboardLayout>
            <Center
                sx={(theme) => ({
                    height: "100vh",
                })}>
                <Paper
                    withBorder
                    padding={"md"}
                    shadow={"md"}
                    sx={(theme) => ({ width: "400px" })}>
                    <Title align="center" order={2}>
                        Scan Log
                    </Title>
                    <Text mb="sm" size="sm" align="center">
                        Each IP counts as a scan towards your quota.
                    </Text>
                    {result !== "" && (
                        <Alert
                            title="Success!"
                            color={"green"}
                            mb="xs"
                            icon={
                                <FontAwesomeIcon
                                    icon={["fas", "circle-check"]}
                                />
                            }>
                            {result}
                        </Alert>
                    )}
                    <form
                        onSubmit={scanTextForm.onSubmit((values) =>
                            onSubmit(values)
                        )}>
                        <Textarea
                            label={
                                <>
                                    <Text>IP Addresses</Text>
                                    <Text size="xs" color="dimmed">
                                        IP addresses should be spaced using
                                        space, comma or newline
                                    </Text>
                                </>
                            }
                            placeholder="xxx.xxx.xxx.xxx, xxx.xxx.xxx.xxx, xxx.xxx.xxx.xxx"
                            mb={"md"}
                            {...scanTextForm.getInputProps("ipAddresses")}
                        />
                        <Button
                            type="submit"
                            loading={loading}
                            disabled={csvContent !== null}
                            fullWidth>
                            Check
                        </Button>
                    </form>
                    <Divider label="OR" labelPosition="center" my="md" />

                    {csvContent !== null ? (
                        <form
                            onSubmit={selectHeaderForm.onSubmit((values) =>
                                onSelectedHeaderSubmit(values)
                            )}>
                            <NativeSelect
                                data={Object.keys(csvContent.data[0]).map(
                                    (key) => ({
                                        label: key,
                                        value: key,
                                    })
                                )}
                                placeholder="Pick one"
                                label="Select Header"
                                required
                                {...selectHeaderForm.getInputProps(
                                    "selectedHeader"
                                )}
                            />
                            <Button type="submit" mt={"md"} fullWidth>
                                Select Header
                            </Button>
                        </form>
                    ) : (
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
                                            Drag and drop a file or click to
                                            select a File.
                                        </Text>

                                        <Text size="sm" color={"dimmed"}>
                                            Currently Support .csv files
                                        </Text>
                                    </div>
                                </Group>
                            )}
                        </Dropzone>
                    )}
                </Paper>
            </Center>
        </DashboardLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    console.log(session);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
