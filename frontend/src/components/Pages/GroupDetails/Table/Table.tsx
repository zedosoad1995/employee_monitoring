import {
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { IColumn, IRow } from "../../../../types/groupsTable";
import TableHeader from "./TableHeader";
import Row from "./TableRow";

interface IProps {
  columns: IColumn[];
  rows: IRow[];
  onClickRow?: (id: string) => () => void;
  style?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  isEditing?: boolean;
  onChangeTime?: (
    row: string
  ) => (col: string) => (value: any, keyboardInputValue?: string) => void;
  onChangeSelect?: (
    row: string
  ) => (
    col: string
  ) => (event: SelectChangeEvent<number>, child: React.ReactNode) => void;
  selectValues?: any[];
}

export default function ({
  columns,
  rows,
  onClickRow,
  style,
  cellStyle,
  isEditing,
  onChangeTime,
  onChangeSelect,
  selectValues,
}: IProps) {
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
                cellStyle={cellStyle}
                isEditing={isEditing}
                onChangeTime={onChangeTime ? onChangeTime(row.id) : undefined}
                onChangeSelect={
                  onChangeSelect ? onChangeSelect(row.id) : undefined
                }
                selectValues={selectValues}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
