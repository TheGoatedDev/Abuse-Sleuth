/* eslint-disable indent */
import {
    Anchor,
    Box,
    Center,
    Group,
    MantineTheme,
    Space,
    Text,
    ThemeIcon,
    useMantineTheme,
} from "@mantine/core";
import { Dropzone, DropzoneStatus } from "@mantine/dropzone";
import { useState } from "react";
import Papa from "papaparse";
import { scanLog } from "@services/api";
import { FileIcon } from "@icons";
import { useAuth } from "@contexts/AuthProvider";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][6]
        : status.rejected
        ? theme.colors.red[6]
        : theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.black;
}

const LogScanForm: React.FC = () => {
    const theme = useMantineTheme();
    const { user } = useAuth();

    const [scanLoading, setScanLoading] = useState(false);
    const [reportID, setReportID] = useState(-1);
    const [amountIPs, setAmountIPs] = useState(0);

    const onDropFile = (file: File) => {
        setScanLoading(true);

        const reader = new FileReader();

        reader.onloadend = async ({ target }) => {
            if (target == null) {
                return;
            }
            const csv = Papa.parse(target.result as string, { header: true });

            const RawIPAddresses = csv.data.map((x: any) => {
                const rawField: string = x["Source IP"];
                if (rawField) {
                    return rawField.split(" ")[0];
                }
                return "0.0.0.0";
            });

            const ipAddresses = [...new Set(RawIPAddresses)];
            setAmountIPs(ipAddresses.length);

            const webRequestResponse = await scanLog(ipAddresses, user!);

            setReportID(webRequestResponse.data.reportId);
            setScanLoading(false);
        };

        reader.readAsText(file);
    };

    return (
        <>
            <Dropzone
                multiple={false}
                onDrop={(files) => onDropFile(files[0])}
                onReject={(files) => console.log("rejected files", files)}
                loading={scanLoading}
            >
                {(status) => (
                    <Group position="center" direction={"row"} spacing={"xl"}>
                        <ThemeIcon
                            size={80}
                            color={getIconColor(status, theme)}
                        >
                            <FileIcon size={"3x"} />
                        </ThemeIcon>

                        <Box>
                            <Text>Drag CSV here or Click to select file</Text>
                            <Text size="sm" weight={"bold"} align="center">
                                Ensure that you have headers!
                            </Text>
                        </Box>
                    </Group>
                )}
            </Dropzone>
            <Space h="sm" />
            {amountIPs > 0 && (
                <Center>
                    <Text>Scanning {amountIPs} IP Addresses</Text>
                </Center>
            )}
            {reportID !== -1 ? (
                <Text mt={"xs"}>
                    Report #{reportID} Generated!{" "}
                    <Anchor href={"/dashboard/reports/" + reportID}>
                        Click Here to Open
                    </Anchor>
                </Text>
            ) : (
                ""
            )}
        </>
    );
};

export default LogScanForm;
