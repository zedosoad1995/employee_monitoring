import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { IColumn, IRow } from "../../../../types/groupsTable";
import TableHeader from "./TableHeader";
import Row from "./TableRow";

interface IProps {
  columns: IColumn[];
  rows: IRow[];
  onClickRow?: (id: string) => () => void;
  style?: React.CSSProperties;
}

export default function ({ columns, rows, onClickRow, style }: IProps) {
  return (
    <TableContainer style={style} component={Paper}>
      <Table sx={{ width: "100%", borderCollapse: "initial" }} size="small">
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
