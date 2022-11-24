import { TableCell, TableRow, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { parse } from "date-fns";
import { IColumn, IRow } from "../../../../types/groupsTable";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const CellComponent = (row: IRow, col: IColumn, isEditing?: boolean) => {
  return (
    <>
      {(!isEditing || !col.canEdit) && row[col.id]}
      {isEditing && col.canEdit && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={parse(row[col.id], "HH:mm", new Date())}
            onChange={() => {}}
            renderInput={(params) => (
              <TextField
                id="name"
                sx={{
                  "& .MuiInputBase-root": { fontSize: "inherit" },
                  minWidth: "100px",
                }}
                size="small"
                {...params}
              />
            )}
            ampm={false}
          />
        </LocalizationProvider>
      )}
    </>
  );
};

interface IProps {
  row: IRow;
  columns: IColumn[];
  onClickRow?: () => void;
  cellStyle?: React.CSSProperties;
  isEditing?: boolean;
}

export default function ({
  row,
  columns,
  onClickRow,
  cellStyle,
  isEditing,
}: IProps) {
  return (
    <TableRow
      hover
      sx={onClickRow ? { cursor: "pointer" } : {}}
      onClick={onClickRow}
    >
      {columns.map((col) => {
        let transformedCellStyle = { ...cellStyle };
        if (isEditing && col.canEdit)
          transformedCellStyle = { ...cellStyle, padding: "3px 3px" };

        return (
          <TableCell
            key={col.id}
            align={col.numeric ? "right" : "left"}
            style={transformedCellStyle}
          >
            {CellComponent(row, col, isEditing)}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
