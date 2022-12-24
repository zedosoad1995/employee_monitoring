import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { parse } from "date-fns";
import { IColumn, IRow, CellType } from "../../../../types/groupsTable";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface ICellComponent {
  row: IRow;
  col: IColumn;
  isEditing: boolean | undefined;
  onChangeTime: (value: any, keyboardInputValue?: string) => void;
  onChangeSelect:
    | ((event: SelectChangeEvent<number>, child: React.ReactNode) => void)
    | undefined;
  selectValues: string[] | undefined;
}

const CellComponent = ({
  row,
  col,
  isEditing,
  onChangeTime,
  onChangeSelect,
  selectValues,
}: ICellComponent) => {
  const isEditingTime = isEditing && col.canEdit && col.type === CellType.TIME;
  const isEditingSelect =
    isEditing && col.canEdit && col.type === CellType.SELECT;
  const isNotEditing = !(isEditingTime || isEditingSelect);

  return (
    <>
      {isNotEditing && row[col.id]}
      {isEditingTime && row[col.id] !== undefined && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={
              row[col.id] ? parse(row[col.id], "HH:mm", new Date()) : new Date()
            }
            onChange={onChangeTime}
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
      {isEditingSelect && (
        <Select
          sx={{ height: "28px", width: "-webkit-fill-available" }}
          size="small"
          value={row[col.id] ?? ""}
          onChange={onChangeSelect}
        >
          <MenuItem value={""}>-</MenuItem>
          {selectValues &&
            selectValues.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
        </Select>
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
  onChangeTime?: (
    col: string
  ) => (value: any, keyboardInputValue?: string) => void;
  onChangeSelect?: (
    col: string
  ) => (event: SelectChangeEvent<number>, child: React.ReactNode) => void;
  selectValues?: any[];
}

export default function ({
  row,
  columns,
  onClickRow,
  cellStyle,
  isEditing,
  onChangeTime,
  onChangeSelect,
  selectValues,
}: IProps) {
  return (
    <TableRow
      key={row.id}
      hover
      sx={onClickRow ? { cursor: "pointer" } : {}}
      onClick={onClickRow}
    >
      {columns.map((col) => {
        let transformedCellStyle = { ...cellStyle };
        if (isEditing && col.canEdit)
          transformedCellStyle = { ...cellStyle, padding: "2px" };

        const handleCellTimeChange = onChangeTime
          ? onChangeTime(col.id)
          : () => {};
        const handleCellSelectChange = onChangeSelect
          ? onChangeSelect(col.id)
          : undefined;

        return (
          <TableCell
            key={col.id}
            align={col.numeric ? "right" : "left"}
            style={transformedCellStyle}
          >
            {CellComponent({
              row,
              col,
              isEditing,
              onChangeTime: handleCellTimeChange,
              onChangeSelect: handleCellSelectChange,
              selectValues,
            })}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
