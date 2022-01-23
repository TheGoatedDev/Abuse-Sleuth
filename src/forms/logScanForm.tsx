import { faFile, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Divider,
    Group,
    MantineTheme,
    Text,
    Textarea,
    ThemeIcon,
    useMantineTheme,
} from "@mantine/core";
import { Dropzone, DropzoneStatus, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/hooks";
import axios from "axios";
import { useRef, useState } from "react";
import Papa from "papaparse";

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
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            ipAddresses: "",
            ignoreCache: false,
        },
    });

    const onDropFile = (file: File) => {
        console.log(file);
        setLoading(true);

        const reader = new FileReader();

        reader.onloadend = ({ target }) => {
            if (target == null) {
                return;
            }
            const csv = Papa.parse(target.result as string, { header: true });
            const IPAddresses = csv.data.map((x: any) => {
                const rawField: string = x["Source IP"];
                if (rawField) {
                    return rawField.split(" ")[0];
                } else {
                    return "0.0.0.0";
                }
            });

            // TODO: Add the WEB REQUEST

            console.log("Done", IPAddresses);
        };

        reader.readAsText(file);

        setLoading(false);
    };

    return (
        <>
            <Dropzone
                multiple={false}
                onDrop={(files) => onDropFile(files[0])}
                onReject={(files) => console.log("rejected files", files)}
                loading={loading}
            >
                {(status) => (
                    <Group position="center" direction={"row"} spacing={"xl"}>
                        <ThemeIcon
                            size={80}
                            color={getIconColor(status, theme)}
                        >
                            <FontAwesomeIcon icon={faFile} size={"3x"} />
                        </ThemeIcon>

                        <Box>
                            <Text inline>
                                Drag CSV here or Click to select file
                            </Text>
                        </Box>
                    </Group>
                )}
            </Dropzone>
        </>
    );
};

export default LogScanForm;
