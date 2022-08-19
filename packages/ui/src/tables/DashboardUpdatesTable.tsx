import { Badge, Text } from "@mantine/core";
import React from "react";
import { FaCheckSquare } from "react-icons/fa";
import { Column } from "react-table";

import DataTable from "./DataTable";

export enum Severity {
    CRIT = "CRITICAL",
    WARN = "WARNING",
    INFO = "INFORMATIONAL",
}

const convertTable = {
    CRITICAL: 1,
    WARNING: 2,
    INFORMATIONAL: 3,
};

interface Updates {
    severity: Severity;
    message: string;
}

interface UpdatesInternal {
    severity: JSX.Element;
    message: JSX.Element;
}

export const DashboardUpdatesTable: React.FC<{ updates: Updates[] }> = (
    props
) => {
    const columns: Column<UpdatesInternal>[] = [
        {
            Header: "Severity",
            accessor: "severity",
            sortType: (A, B) => {
                const ASeverity = A.original.severity
                    .key as keyof typeof convertTable;
                const BSeverity = B.original.severity
                    .key as keyof typeof convertTable;

                return convertTable[ASeverity] < convertTable[BSeverity]
                    ? 1
                    : -1;
            },
        },
        {
            Header: "Message",
            accessor: "message",
            disableSortBy: true,
        },
    ];

    const updates: UpdatesInternal[] = props.updates.map((update) => {
        return {
            severity:
                update.severity === Severity.CRIT ? (
                    <Badge variant="filled" color="red" key={update.severity}>
                        {update.severity.toString()}
                    </Badge>
                ) : update.severity === Severity.WARN ? (
                    <Badge
                        variant="filled"
                        color="yellow"
                        key={update.severity}>
                        {update.severity.toString()}
                    </Badge>
                ) : (
                    <Badge variant="filled" color="blue" key={update.severity}>
                        {update.severity.toString()}
                    </Badge>
                ),
            message: <Text lineClamp={2}>{update.message}</Text>,
        };
    });

    return (
        <DataTable<UpdatesInternal>
            enableSorting
            tableProps={{ p: "md" }}
            columns={columns}
            data={updates}
        />
    );
};
