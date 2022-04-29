
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TableSortLabel,
  styled,
} from '@mui/material'
import { useState, useEffect } from 'react'
import SortElement from './sortElement'
import FilterElement from './filterElement'
import NotFound from './notFound'

const CustomSortLabel = styled(
  TableSortLabel,
  {}
)(({ theme, active }) => ({
  color: `${theme.palette.primary.main} !important `,
  '.MuiTableSortLabel-icon': {
    fill: `${
      active ? theme.palette.secondary.main : theme.palette.primary.dark
    } !important `,
  },
}))
export default function Table({ rows, columns, filterStatement }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [order, setOrder] = useState({ order: 'asc', property: '' })
  const [rowsLength, setLength] = useState(0)

  useEffect(() => {
    setLength(rows.length)
  }, [rows])

  function setSort(property) {
    if (order.property === property) {
      setOrder({ order: order.order === 'asc' ? 'desc' : 'asc', property })
    } else {
      setOrder({ order: 'asc', property })
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.palette.divider}`,
            })}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={(theme) => ({
                    transitionDuration: '200ms',

                    py: '10px',
                    ':hover': {
                      transitionDuration: '200ms',
                      filter: 'brightness(95%)',
                    },
                  })}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <CustomSortLabel
                    active={order.property === column.id}
                    direction={
                      order.property === column.id ? order.order : 'asc'
                    }
                    onClick={() => setSort(column.id)}
                  >
                    {column.label}
                  </CustomSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <FilterElement
              rows={rows}
              columns={columns}
              filterStatement={filterStatement}
            >
              {(filteredRows) => (
                <SortElement rows={filteredRows} columns={columns} sort={order}>
                  {(sortedRows) => {
                    setLength(sortedRows.length)

                    if (sortedRows.length === 0) {
                      return <NotFound colspan={columns.length} />
                    }
                    return sortedRows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            sx={{ transitionDuration: '300ms' }}
                            hover
                            tabIndex={-1}
                            key={JSON.stringify(row)}
                          >
                            {columns.map((column) => {
                              const value = row[column.id]
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format ? column.format(value) : value}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })
                  }}
                </SortElement>
              )}
            </FilterElement>
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rowsLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(e.target.value)
          setPage(0)
        }}
      />
    </Paper>
  )
}
