import { Fragment, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { makeStyles } from '@mui/styles'
import OutlinedInput, {
  OutlinedInputProps as MaterialOutlinedInputProps,
} from '@mui/material/OutlinedInput'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableContainer, {
  TableContainerProps as MaterialTableContainerProps,
} from '@mui/material/TableContainer'
import { entriesNotIn, objectByString, reorderFromObject } from './utils'

type IAdditionnalColumnType = (id: any) => JSX.Element

export interface ReactMaterialUiTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  headers: Record<string, string>
  rows: Array<Record<string, any>>
  OutlinedInputProps?: MaterialOutlinedInputProps
  TableCellHeaderProps?: TableCellProps
  TableCellBodyProps?: TableCellProps
  TableContainerProps?: MaterialTableContainerProps
  labelRowsPerPage?: string
  backIconButtonText?: string
  nextIconButtonText?: string
  showSearch?: boolean
  hiddenColumns?: string[]
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  additionalColumnsId?: string
  additionalColumnsLabel?: string
  additionalColumns?: Array<IAdditionnalColumnType>
  tablePaginationClassName?: string
}

const useStyles = makeStyles(() => ({
  search: {
    marginBottom: 30,
  },
}))

export const formatHeaderColumn = (head: Record<string, any>) =>
  Object.keys(head).reduce((allHeaders, header) => ({ ...allHeaders, [header]: header }), {})

export const ReactMaterialUiTable = ({
  headers,
  rows,
  OutlinedInputProps,
  TableCellHeaderProps,
  TableCellBodyProps,
  TableContainerProps,
  tablePaginationClassName,
  labelRowsPerPage = 'Column per page',
  backIconButtonText = 'back',
  nextIconButtonText = 'next',
  showSearch = true,
  hiddenColumns = [],
  rowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 100],
  additionalColumnsId = 'id',
  additionalColumnsLabel = 'Actions',
  additionalColumns = [],
  ...props
}: ReactMaterialUiTableProps) => {
  const classes = useStyles()
  const [search, setSearch] = useState<string>('')
  const [rowsPerPageState, setRowsPerPageState] = useState<number>(rowsPerPage)
  const [page, setPage] = useState(0)

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPageState(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Fragment>
      {showSearch && (
        <OutlinedInput
          type={'search'}
          name={'search'}
          placeholder={'search'}
          fullWidth
          value={search}
          className={classes.search}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setSearch(e.target.value)
          }
          {...OutlinedInputProps}
        />
      )}
      <TableContainer {...TableContainerProps}>
        <Table stickyHeader aria-label="sticky table" {...props}>
          <TableHead>
            <TableRow>
              {Object.entries(headers)
                .filter(entriesNotIn(hiddenColumns))
                .map(([, headerCell]: [string, string], key: number) => (
                  <TableCell key={`headers-${key}`} {...TableCellHeaderProps}>
                    {headerCell}
                  </TableCell>
                ))}
              {additionalColumnsLabel && additionalColumns.length ? (
                <TableCell {...TableCellHeaderProps}>{additionalColumnsLabel}</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPageState, page * rowsPerPageState + rowsPerPageState)
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
                  {additionalColumnsLabel && additionalColumns.length ? (
                    <TableCell {...TableCellBodyProps}>
                      {additionalColumns.map(
                        (additionalColumn: IAdditionnalColumnType, keyAction: number) => (
                          <span key={`action-${keyAction}`}>
                            {additionalColumn(row[additionalColumnsId])}
                          </span>
                        )
                      )}
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
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPageState}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        backIconButtonProps={{
          title: backIconButtonText,
        }}
        nextIconButtonProps={{
          title: nextIconButtonText,
        }}
      />
    </Fragment>
  )
}
