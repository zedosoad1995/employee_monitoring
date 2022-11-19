import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { IColumn, IRow } from "../../../../types/groupsTable";
import TableHeader from "./TableHeader";
import Row from "./TableRow";

interface IProps {
  columns: IColumn[];
  rows: IRow[];
  onClickRow?: (id: string) => () => void;
}

export default function ({ columns, rows, onClickRow }: IProps) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: "100%", borderCollapse: "initial" }}
        aria-labelledby="tableTitle"
        size="small"
      >
        <TableHeader columns={columns} />
        <TableBody>
          {rows.map((row) => {
            const onClickRowFn = onClickRow ? onClickRow(row.id) : undefined;

            return (
              <Row
                key={row.id}
                onClickRow={onClickRowFn}
                row={row}
                columns={columns}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
