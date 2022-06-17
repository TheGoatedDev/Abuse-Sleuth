import {
    FaCaretSquareDown,
    FaCaretSquareUp,
    FaMinusSquare,
} from "react-icons/fa";
import { Column, useSortBy, useTable } from "react-table";

import { Box, Group, Table } from "@abuse-sleuth/ui";

interface Param<T extends object> {
    data: T[];
    columns: Column<T>[];
    enableSorting?: boolean;
}

const DataTable = <A extends object>({
    data,
    columns,
    enableSorting = false,
}: Param<A>) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useSortBy
        );

    return (
        <Table {...getTableProps()} highlightOnHover>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(
                                    enableSorting
                                        ? column.getSortByToggleProps()
                                        : undefined
                                )}>
                                <Group spacing={"xs"} align="center">
                                    <span>{column.render("Header")}</span>
                                    {enableSorting && (
                                        <Box pt={3}>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <FaCaretSquareDown />
                                                ) : (
                                                    <FaCaretSquareUp />
                                                )
                                            ) : (
                                                <FaMinusSquare />
                                            )}
                                        </Box>
                                    )}
                                </Group>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default DataTable;
