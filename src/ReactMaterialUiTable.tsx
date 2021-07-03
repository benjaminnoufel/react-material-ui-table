import React from "react";
import Table from "@material-ui/core/Table";
import {TableBody} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import OutlinedInput, {OutlinedInputProps as MaterialOutlinedInputProps} from "@material-ui/core/OutlinedInput";
import TableCell, {TableCellProps} from "@material-ui/core/TableCell";
import TableContainer, {TableContainerProps as MaterialTableContainerProps} from "@material-ui/core/TableContainer";
import {entriesNotIn, objectByString, reorderFromObject} from "./utils";

type AdditionnalColumn = (id: any) => JSX.Element;

export interface ReactMaterialUiTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    headers: Record<string, string>;
    rows: Array<Record<string, any>>;
    OutlinedInputProps?: MaterialOutlinedInputProps;
    TableCellHeaderProps?: TableCellProps;
    TableCellBodyProps?: TableCellProps;
    TableContainerProps?: MaterialTableContainerProps;
    labelRowsPerPage?: string;
    backIconButtonText?: string;
    nextIconButtonText?: string;
    showSearch?: boolean;
    hiddenColumns?: string[];
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    additionnalColumnsId?: string;
    additionnalColumnsLabel?: string;
    additionnalColumns?: Array<AdditionnalColumn>;
    tablePaginationClassName?: string;
}

const useStyles = makeStyles(() => ({
    search: {
        marginBottom: 30
    }
}));


export const ReactMaterialUiTable = ({headers, rows, OutlinedInputProps, TableCellHeaderProps, TableCellBodyProps, TableContainerProps, tablePaginationClassName, labelRowsPerPage = "Column per page", backIconButtonText = "back", nextIconButtonText = "next", showSearch = true, hiddenColumns = [], rowsPerPage = 10, rowsPerPageOptions = [10, 25, 100], additionnalColumnsId = "_id", additionnalColumnsLabel = "Actions", additionnalColumns = [], ...props}: ReactMaterialUiTableProps) => {
    const classes = useStyles();
    const [search, setSearch] = React.useState<string>("");
    const [rowsPerPageState, setRowsPerPageState] = React.useState<number>(rowsPerPage);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPageState(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            {showSearch && (
                <OutlinedInput
                    type={"search"}
                    name={"search"}
                    placeholder={"search"}
                    fullWidth
                    value={search}
                    className={classes.search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearch(e.target.value)}
                    {...OutlinedInputProps}
                />
            )}
            <TableContainer {...TableContainerProps}>
                <Table stickyHeader aria-label="sticky table" {...props}>
                    <TableHead>
                        <TableRow>
                            {Object
                                .entries(headers)
                                .filter(entriesNotIn(hiddenColumns))
                                .map(([, headerCell]: [string, string], key: number) => <TableCell key={`headers-${key}`} {...TableCellHeaderProps}>{headerCell}</TableCell>)}
                            {additionnalColumnsLabel && additionnalColumns.length ? (<TableCell {...TableCellHeaderProps}>{additionnalColumnsLabel}</TableCell>) : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPageState, ((page * rowsPerPageState) + rowsPerPageState))
                            .filter(objectByString(search))
                            .map((row: Record<string, any>, rowKey: number) => (
                                <TableRow key={`row-${rowKey}`}>
                                    {Object.entries(reorderFromObject(headers, row))
                                        .filter(entriesNotIn(hiddenColumns))
                                        .map(([, column]: [string, any], key: number) => (
                                            <TableCell key={`cell-${key}`} {...TableCellBodyProps}>
                                                {column}
                                            </TableCell>
                                        ))}
                                    {additionnalColumnsLabel && additionnalColumns.length ? (
                                        <TableCell {...TableCellBodyProps}>
                                            {additionnalColumns.map((additionnalColumn: AdditionnalColumn, keyAction: number) => (
                                                <span key={`action-${keyAction}`}>
                                                    {additionnalColumn(row[additionnalColumnsId])}
                                                </span>
                                            ))}
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className={tablePaginationClassName}
                rowsPerPageOptions={rowsPerPageOptions}
                labelRowsPerPage={labelRowsPerPage}
                backIconButtonText={backIconButtonText}
                nextIconButtonText={nextIconButtonText}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPageState}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
};
