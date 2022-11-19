import { TableCell, TableRow } from "@mui/material";
import { IColumn, IRow } from "../../../../types/groupsTable";

interface IProps {
  row: IRow;
  columns: IColumn[];
}

export default function ({ row, columns }: IProps) {
  return (
    <TableRow hover tabIndex={-1}>
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
