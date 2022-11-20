import { TableCell, TableRow } from "@mui/material";
import { IColumn, IRow } from "../../../../types/groupsTable";

interface IProps {
  row: IRow;
  columns: IColumn[];
  onClickRow?: () => void;
}

export default function ({ row, columns, onClickRow }: IProps) {
  return (
    <TableRow
      hover
      sx={onClickRow ? { cursor: "pointer" } : {}}
      onClick={onClickRow}
    >
      {columns.map((col) => {
        return (
          <TableCell key={col.id} align={col.numeric ? "right" : "left"}>
            {row[col.id]}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
