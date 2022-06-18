import {
    FaCaretSquareDown,
    FaCaretSquareUp,
    FaMinusSquare,
} from "react-icons/fa";
import { Column, useSortBy, useTable } from "react-table";

import { Box, Group, Table, TableProps } from "@abuse-sleuth/ui";

interface Param<T extends object> {
    data: T[];
    columns: Column<T>[];
    enableSorting?: boolean;
    tableProps?: TableProps;
}

const DataTable = <A extends object>({
    data,
    columns,
    enableSorting = false,
    tableProps,
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
        <Table {...getTableProps()} {...tableProps} highlightOnHover>
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
                                <Group position="center">
                                    <Box>{column.render("Header")}</Box>
                                    {enableSorting && column.canSort && (
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
                                    <Box style={{ textAlign: "center" }}>
                                        {cell.render("Cell")}
                                    </Box>
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
