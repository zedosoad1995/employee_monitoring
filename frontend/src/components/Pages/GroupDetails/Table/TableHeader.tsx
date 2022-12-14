import { TableCell, TableHead, TableRow } from "@mui/material";
import { IColumn } from "../../../../types/groupsTable";

interface IProps {
  columns: IColumn[];
}

export default function ({ columns }: IProps) {
  const isEveryColEmpty = columns.every((col) => !col.label);
  if (isEveryColEmpty) {
    return <></>;
  }

  return (
    <TableHead
      sx={{ position: "sticky", backgroundColor: "white", zIndex: 100, top: 0 }}
    >
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            sx={!col.label ? { width: 0, padding: 0, margin: 0 } : {}}
            align={col.numeric ? "right" : "left"}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
