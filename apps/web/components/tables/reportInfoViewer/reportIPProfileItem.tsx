import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";

import { CountryFlagText } from "@components/widgets/countryFlagText";

import { Button, Group, Text } from "@mantine/core";

export enum ScanStatus {
    PENDING = "Pending",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
}

type IComponentProps = {
    ipAddress: string;
    isPrivate: boolean;
    countryCode: string;
    createdAt: Date;
    scanStatuses: {
        abuseIPDB?: ScanStatus;
    };
};

export const ReportIPProfileItem: React.FC<IComponentProps> = ({
    ipAddress,
    isPrivate,
    countryCode,
    createdAt,
    scanStatuses,
}) => {
    const scanAmount = isPrivate
        ? 0
        : scanStatuses.abuseIPDB === ScanStatus.COMPLETED
        ? 1
        : 0;
    const scanColor =
        scanAmount > 4 ? "green" : scanAmount > 2 ? "yellow" : "red";

    console.log(scanStatuses);

    return (
        <tr>
            <td>{ipAddress}</td>
            <td>
                <CountryFlagText
                    isPrivateAddress={isPrivate}
                    countryCode={countryCode}
                />
            </td>
            <td>
                <Text size="sm" weight={"bold"} color={scanColor}>
                    {scanAmount}/1
                </Text>
            </td>
            <td>{dayjs(createdAt).format("DD/MM/YYYY hh:mm:ss A")}</td>
            <td>TODO</td>
        </tr>
    );
};
