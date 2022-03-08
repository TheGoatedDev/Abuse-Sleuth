import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";

import { Button, Group } from "@mantine/core";

type IComponentProps = {
    report: {
        id: string;
        createdAt: Date;
        expiresAt: Date;
    };
};

export const ReportItem: React.FC<IComponentProps> = ({ report }) => {
    const router = useRouter();

    return (
        <tr>
            <td>{report.id}</td>
            <td>{dayjs(report.createdAt).format("DD/MM/YYYY hh:mm:ss A")}</td>
            <td>{dayjs(report.expiresAt).format("DD/MM/YYYY hh:mm:ss A")}</td>
            <td>
                <Group>
                    <Button
                        compact
                        onClick={() =>
                            router.push(`/dashboard/report/${report.id}`)
                        }>
                        View
                    </Button>
                </Group>
            </td>
        </tr>
    );
};
