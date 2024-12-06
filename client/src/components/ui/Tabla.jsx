import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const defaultRows = [
  { id: 1, col1: "Frozen yoghurt", col2: 159, col3: "6.0" },
  { id: 2, col1: "Ice cream sandwich", col2: 237, col3: "9.0" },
  { id: 3, col1: "Eclair", col2: 262, col3: "16.0" },
  { id: 4, col1: "Cupcake", col2: 305, col3: "3.7" },
  { id: 5, col1: "Gingerbread", col2: 356, col3: "16.0" },
];

export default function Tabla({ col1, col2, col3, rows = defaultRows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">{col1}</StyledTableCell>
            <StyledTableCell align="right">{col2}</StyledTableCell>
            <StyledTableCell align="right">{col3}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.col1}</StyledTableCell>
              <StyledTableCell align="right">{row.col2}</StyledTableCell>
              <StyledTableCell align="right">{row.col3}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
