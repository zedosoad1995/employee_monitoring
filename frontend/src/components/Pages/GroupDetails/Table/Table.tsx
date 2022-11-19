import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { IColumn, IRow } from "../../../../types/groupsTable";
import TableHeader from "./TableHeader";
import Row from "./TableRow";

interface IProps {
  columns: IColumn[];
  rows: IRow[];
}

export default function ({ columns, rows }: IProps) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: "100%", borderCollapse: "initial" }}
        aria-labelledby="tableTitle"
        size="small"
      >
        <TableHeader columns={columns} />
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} columns={columns} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
