import { TableCell, TableRow } from "@mui/material";
import { IColumn, IRow } from "../../../../types/groupsTable";

interface IProps {
  row: IRow;
  columns: IColumn[];
  onClickRow?: () => void;
}

export default function ({ row, columns, onClickRow }: IProps) {
  return (
    <TableRow hover onClick={onClickRow}>
      {columns.map((col) => {
        return (
          <TableCell
            key={col.id}
            sx={col.isHidden ? { width: 0, padding: 0, margin: 0 } : {}}
            align={col.numeric ? "right" : "left"}
          >
            {row[col.id]}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
