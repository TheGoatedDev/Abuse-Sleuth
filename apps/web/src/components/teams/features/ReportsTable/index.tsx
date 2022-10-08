import { useEffect, useState } from "react";

import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    ActionIcon,
    Group,
    LoadingOverlay,
    Table,
} from "@abuse-sleuth/ui/components/atoms";
import { IconDoorEnter, IconX } from "@abuse-sleuth/ui/icons";
import { FCC } from "@abuse-sleuth/ui/types";

type ReportsTableProps = {
    teamId: string;
};

export const ReportsTable: FCC<ReportsTableProps> = ({ teamId }) => {
    const trpcContext = trpcClient.useContext();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reports, setReports] = useState<number[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setReports([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            setIsLoading(false);
        }, 5000);
    }, []);

    return (
        <Table striped highlightOnHover>
            <thead>
                <tr>
                    <th>Report Name</th>
                    <th>Total Scans</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody style={{ position: "relative" }}>
                <LoadingOverlay
                    visible={isLoading}
                    style={{ height: "100px" }}
                />
                {reports.map((x, i) => (
                    <tr key={i}>
                        <td>Report-{x}</td>
                        <td>{Math.floor(Math.random() * 10000)}</td>
                        <td>{new Date().toUTCString()}</td>
                        <td>
                            <Group>
                                <ActionIcon variant="light" color={"green"}>
                                    <IconDoorEnter />
                                </ActionIcon>
                                <ActionIcon variant="light" color={"red"}>
                                    <IconX />
                                </ActionIcon>
                            </Group>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ReportsTable;
