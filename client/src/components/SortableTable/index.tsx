import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { FC, useState } from 'react';


export interface Column {
  headerName: string;
  field: string;
  align?: 'left' | 'right';
  minWidth?: string;
}

export interface Row extends Record<'id' | string, any> {}

function fill(rows: Row[], rowPerPage: number): Row[] {
  const { length } = rows;
  if (length !== rowPerPage) {
    rows.length = rowPerPage;
    rows.fill({}, length, rowPerPage);
  }
  return rows;
}

function hasRow(rows: Row[], page: number, rowsPerPage: number, index: number): boolean {
  return slice(rows, page, rowsPerPage).length > index;
}

function slice<T>(array: T[], page: number, rowsPerPage: number): T[] {
  return array.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
}

function isNotEmpty<T>(array: T[]): boolean {
  return array && array.length > 0;
}

interface Action {
  icon: any;
  id: string;
  handle: (row: Row, idx: number) => void;
}

interface SortableListProps {
  columns: Column[];
  rows: Row[];
  classes?: string;
  actions?: Action[];
  deleteAction?: (row: Row, idx: number) => void;
}

export const SortableTable: FC<SortableListProps> = ({ columns, rows, classes, actions = [], deleteAction }) => {
  const [ page, setPage ] = useState<number>(0);
  const [ rowsPerPage, setRowsPerPage ] = useState<number>(10);

  const handleChangePage = (value: number) => setPage(value);
  const handleChangeRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  return (
    <Paper elevation={2} className={classes}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(({ field, headerName, align = 'left', minWidth }) => (
                <TableCell
                  key={field}
                  align={align}
                  style={{ minWidth }}
                >
                  {headerName}
                </TableCell>
              ))}
              {(isNotEmpty(actions) || deleteAction) && (
                <TableCell key='actions' align='right'>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isNotEmpty(rows) ? fill(slice(rows, page, rowsPerPage), rowsPerPage).map((row: Row, idx: number) => (
              <TableRow key={page * rowsPerPage + idx}>
                {columns.map((column: Column) => (
                  <TableCell key={column.field} align={column.align}>
                    {row[column.field] ?? '_'}
                  </TableCell>
                ))}
                {(isNotEmpty(actions) || deleteAction) && (
                  <TableCell key='actions' align='right' style={{ padding: '0 16px' }}>
                    {hasRow(rows, page, rowsPerPage, idx) && isNotEmpty(actions) && actions.map(action => (
                      <IconButton onClick={() => action.handle(row, idx)} key={action.id}>
                        <>{action.icon}</>
                      </IconButton>
                    ))}
                    {hasRow(rows, page, rowsPerPage, idx) && deleteAction && (
                      <IconButton onClick={() => deleteAction(row, idx)}>
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )) : <>
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <Button color='secondary' href='/admin/teams' fullWidth>Ajouter une équipe</Button>
                </TableCell>
              </TableRow>
            </>
          }
          </TableBody>
        </Table>
      </TableContainer>
      {rows && rows.length > 0 && <TablePagination 
        labelRowsPerPage='Lignes par page:'
        component='div'
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25]}
        count={rows.length}
        onChangePage={(e, value) => handleChangePage(value) }
        onChangeRowsPerPage={(e) => handleChangeRowsPerPage(+e.target.value)}
      />}
      
    </Paper>
  );
}