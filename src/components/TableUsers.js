import React from "react";
import Loading from "./Loading";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableUsers = ({ dataList }) => {
  return (
    <>
      {dataList ? (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Nombre</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Rol</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.map((user) => (
                  <StyledTableRow key={user.key + "filter"}>
                    <StyledTableCell align="left">{user.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {user.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.role}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TableUsers;
