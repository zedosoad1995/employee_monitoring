import TableBody from "@mui/material/TableBody";
import { TableContentProps } from "../../../types/table";

import Row from "./Row";

export default function TableContent(props: TableContentProps) {
  const {
    rows,
    collapsedRows,
    columns,
    collapsedcolumns,
    rowsPerPage,
    editRows,
    editCollapsedRows,
    editRowNum,
    addCollapsedRow,
    hiddenCols,
    onClickRow,
  } = props;

  const emptyRows = Math.max(0, rowsPerPage - (rows ? rows.length : 0));

  return (
    <TableBody>
      {rows &&
        rows.map((row, index) => {
          const onClickRowFn = onClickRow ? onClickRow(row.id) : undefined;

          return (
            <Row
              key={index}
              row={row}
              collapsedRow={collapsedRows ? collapsedRows[index] : null}
              columns={columns}
              collapsedcolumns={collapsedcolumns}
              editRows={editRows && editRows(index)}
              editCollapsedRows={editCollapsedRows && editCollapsedRows(index)}
              isEditing={editRowNum === index}
              addCollapsedRow={addCollapsedRow && addCollapsedRow(index)}
              hiddenCols={hiddenCols}
              onClickRow={onClickRowFn}
            />
          );
        })}
      {/* {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: 47 * emptyRows,
                    }}
                >
                    <TableCell colSpan={columns.length + 1} />
                </TableRow>
            )} */}
    </TableBody>
  );
}
