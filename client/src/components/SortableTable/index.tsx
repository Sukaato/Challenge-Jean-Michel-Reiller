import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { FC, useState } from 'react';


export interface Column {
  headerName: string;
  field: string;
  align?: 'left' | 'right';
  minWidth?: string;
}

export interface Row extends Record<string, any> {}

function fill(rows: Row[], rowPerPage: number): Row[] {
  const { length } = rows;
  if (length !== rowPerPage) {
    rows.length = rowPerPage;
    rows.fill({}, length, rowPerPage);
  }
  return rows;
}

interface SortableListProps {
  columns: Column[];
  rows: Row[];
  classes?: string;
}

export const SortableTable: FC<SortableListProps> = ({ columns, rows, classes }) => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0 ? fill(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), rowsPerPage).map((row: Row, idx: number) => (
              <TableRow key={page * rowsPerPage + idx}>
                {columns.map((column: Column) => (
                  <TableCell key={column.field} align={column.align}>
                    {row[column.field] ?? '_'}
                  </TableCell>
                ))}
              </TableRow>
            )) : <>
              <TableRow>
                <TableCell colSpan={columns.length}>
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