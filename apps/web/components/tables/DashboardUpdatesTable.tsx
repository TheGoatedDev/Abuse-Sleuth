import React from "react";
import { FaCheckSquare } from "react-icons/fa";
import { Column } from "react-table";

import { Badge, Button } from "@abuse-sleuth/ui";

import DataTable from "./DataTable";

interface Updates {
    severity: "INFO" | "WARN" | "CRIT";

    message: string;
}

interface UpdatesInternal {
    severity: JSX.Element;

    message: string;
}

const DashboardUpdatesTable: React.FC<{ updates: Updates[] }> = (props) => {
    const columns: Column<UpdatesInternal>[] = [
        {
            Header: "Severity",
            accessor: "severity",
            maxWidth: 50,
        },
        {
            Header: "Message",
            accessor: "message",
        },
    ];

    const updates: UpdatesInternal[] = props.updates.map((update) => {
        return {
            severity:
                update.severity === "INFO" ? (
                    <Badge variant="filled" color={"blue"}>
                        Infomational
                    </Badge>
                ) : update.severity === "WARN" ? (
                    <Badge variant="filled" color={"orange"}>
                        Warning
                    </Badge>
                ) : (
                    <Badge variant="filled" color={"red"}>
                        Critical
                    </Badge>
                ),

            message: update.message,
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

export default DashboardUpdatesTable;
