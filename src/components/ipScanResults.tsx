import { Group, Paper, Text, Title } from "@mantine/core";
import { AIPDBProfile } from "@prisma/client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface PropsType {
    result?: AIPDBProfile;
}

const IPScanResults: React.FC<PropsType> = (props) => {
    const [fetchedTime, setFetchedTime] = useState<Date | null>(null);

    useEffect(() => {
        setFetchedTime(new Date());
    }, [props.result]);

    return (
        <Paper mt={"xl"}>
            <Title order={2} align="center">
                Results
            </Title>
            <Group>
                <Text weight={700}>Abuse Score: </Text>
                <Text>
                    {props.result?.abuseScore ?? "?"}
                    {props.result?.abuseScore ? "%" : ""}
                </Text>
            </Group>
            <Group>
                <Text weight={700}>Country: </Text>
                <Text>{props.result?.country ?? "?"}</Text>
            </Group>
            <Group>
                <Text weight={700}>Usage Type: </Text>
                <Text>{props.result?.usageType ?? "?"}</Text>
            </Group>
            <Group>
                <Text weight={700}>ISP: </Text>
                <Text>{props.result?.isp ?? "?"}</Text>
            </Group>
            <Group>
                <Text weight={700}>Domain: </Text>
                <Text>{props.result?.domain || "?"}</Text>
            </Group>
            <Group>
                <Text weight={700}>Total Reports: </Text>
                <Text>{props.result?.totalReports ?? "?"}</Text>
            </Group>
            <Group>
                <Text weight={700}>Total Distinct Reportee: </Text>
                <Text>{props.result?.totalDistinctReportee ?? "?"}</Text>
            </Group>
            {fetchedTime ? (
                <Text size="xs" color="dimmed">
                    Fetched @ {dayjs(fetchedTime).toString()}
                </Text>
            ) : null}
        </Paper>
    );
};

export default IPScanResults;
