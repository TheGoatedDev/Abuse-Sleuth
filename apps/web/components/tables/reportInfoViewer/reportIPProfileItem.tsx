import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";

import { Button, Group, Text, CountryFlagText } from "@abuse-sleuth/ui";

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
        whois?: ScanStatus;
    };
};

export const ReportIPProfileItem: React.FC<IComponentProps> = ({
    ipAddress,
    isPrivate,
    countryCode,
    createdAt,
    scanStatuses,
}) => {
    const totalScans = Object.keys(scanStatuses).length;

    const scanAmount = isPrivate
        ? 0
        : Object.values(scanStatuses).filter((v) => v === ScanStatus.COMPLETED)
              .length;
    const scanColor =
        scanAmount == totalScans
            ? "green"
            : scanAmount >= totalScans / 2
            ? "yellow"
            : "red";

    return (
        <tr>
            <td>{ipAddress}</td>
            <td>
                {!isPrivate ? (
                    <CountryFlagText countryCode={countryCode} />
                ) : (
                    <Text size="sm" color="red">
                        Private
                    </Text>
                )}
            </td>
            <td>
                {isPrivate ? (
                    <Text size="sm" color={"red"}>
                        -
                    </Text>
                ) : (
                    <Text size="sm" weight={"bold"} color={scanColor}>
                        {scanAmount}/{totalScans}
                    </Text>
                )}
            </td>
            <td>{dayjs(createdAt).format("DD/MM/YYYY hh:mm:ss A")}</td>
            <td>TODO</td>
        </tr>
    );
};
