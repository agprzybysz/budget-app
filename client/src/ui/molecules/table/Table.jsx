import * as React from 'react';
import Box from '@mui/material/Box';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { EnhancedTableHead } from './components/EnhancedTableHead';
import { EnhancedTableToolbar } from './components/EnhancedTableToolbar';
import TablePagination from '@mui/material/TablePagination';
import { IconButton } from '@mui/material';
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  LastPage,
  FirstPage,
} from '@mui/icons-material';

export const Table = ({
  headCells,
  rows,
  getUniqueId,
  deleteRecords,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  total,
}) => {
  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? rows.map((n) => getUniqueId(n)) : []);
  };

  const handleClick = (event, id) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id],
    );
  };

  const onDelete = () => {
    deleteRecords(selected);
    setSelected([]);
  };

  function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handlePreviousButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 1 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
          sx={{ pr: 0, pl: 0.5 }}
        >
          <FirstPage />
        </IconButton>
        <IconButton
          onClick={handlePreviousButtonClick}
          disabled={page === 0}
          aria-label="previous page"
          sx={{ pr: 0, pl: 0.5 }}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
          sx={{ pr: 0, pl: 0.5 }}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
          sx={{ pr: 0, pl: 0.5 }}
        >
          <LastPage />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <EnhancedTableToolbar selected={selected} onDelete={onDelete} />
      <TableContainer>
        <MuiTable aria-labelledby="tableTitle" size="medium">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {
              /*(perPage > 0
              ? rows.slice(page * perPage, page * perPage + perPage)
              : rows
            ).map((row, index) => {*/

              rows.slice().map((row, index) => {
                const uniqueId = getUniqueId(row);
                const isItemSelected = selected.includes(uniqueId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    key={uniqueId}
                    onClick={(event) => handleClick(event, uniqueId)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {headCells.map((head) => {
                      const renderedRow = head.renderCell(row) || '';

                      return (
                        <TableCell key={head.id} align="left">
                          {renderedRow}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        page={page}
        rowsPerPage={perPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onPerPageChange}
        rowsPerPageOptions={[10, 20, 50]}
        count={total}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page',
          },
          native: true,
        }}
        ActionsComponent={TablePaginationActions}
      />
    </Box>
  );
};
