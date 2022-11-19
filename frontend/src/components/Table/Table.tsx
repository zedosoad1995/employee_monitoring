import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHeader from "./components/TableHeader";
import TableContent from "./components/TableContent";
import Paper from "@mui/material/Paper";

export default function ({
  rows,
  collapsedRows,
  columns,
  collapsedcolumns,
  rowsPerPage,
  order,
  orderBy,
  handleRequestSort,
  editRows,
  editCollapsedRows,
  editRowNum,
  addCollapsedRow,
  hiddenCols = {},
  onClickRow,
}: any) {
  return (
    <TableContainer sx={{ height: "68vh" }} component={Paper}>
      <Table
        sx={{ width: "100%", borderCollapse: "initial" }}
        aria-labelledby="tableTitle"
        size="small"
      >
        <TableHeader
          order={order}
          orderBy={orderBy}
          columns={columns}
          onRequestSort={handleRequestSort}
          collapsedcolumns={collapsedcolumns}
          hiddenCols={hiddenCols}
        />
        <TableContent
          rows={rows}
          collapsedRows={collapsedRows}
          columns={columns}
          collapsedcolumns={collapsedcolumns}
          rowsPerPage={rowsPerPage}
          editRows={editRows}
          editCollapsedRows={editCollapsedRows}
          editRowNum={editRowNum}
          addCollapsedRow={addCollapsedRow}
          hiddenCols={hiddenCols}
          onClickRow={onClickRow}
        />
      </Table>
    </TableContainer>
  );
}
