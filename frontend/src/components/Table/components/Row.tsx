import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RowProps } from "../../../types/table";
import CollapsedTable from "./CollapsedTable";
import { TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parse } from "date-fns";

export default function Row(props: RowProps) {
  const {
    row,
    columns,
    collapsedcolumns,
    collapsedRow,
    editRows,
    editCollapsedRows,
    isEditing,
    addCollapsedRow,
    hiddenCols,
    onClickRow,
  } = props;

  const [open, setOpen] = useState(false);

  const CellComponent = (col: any) => {
    if (col.isLink) return row[col.filterId];

    return (
      <>
        {(!isEditing || !col.isEdit) && row[col.id]}
        {isEditing && col.isEdit && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={parse(row[col.id], "HH:mm", new Date())}
              onChange={editRows(col.id)}
              renderInput={(params) => (
                <TextField
                  id="name"
                  sx={{
                    "& .MuiInputBase-root": { fontSize: "inherit" },
                    minWidth: "110px",
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

  return (
    <>
      <TableRow
        hover
        sx={onClickRow ? { cursor: "pointer" } : {}}
        tabIndex={-1}
        onClick={onClickRow}
      >
        {columns.map((col, index) => {
          return (
            <>
              {!hiddenCols[col.id] && (
                <TableCell
                  key={index}
                  sx={{
                    padding: col.isIcon
                      ? "0 0 0 16px"
                      : isEditing
                      ? "auto"
                      : "auto",
                  }}
                  align={col.numeric ? "right" : "left"}
                >
                  {CellComponent(col)}
                </TableCell>
              )}
              {hiddenCols[col.id] && (
                <TableCell key={index} sx={{ padding: "0px" }} />
              )}
            </>
          );
        })}
        {collapsedRow && collapsedcolumns && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {collapsedRow && collapsedcolumns && (
        <CollapsedTable
          open={open}
          rows={collapsedRow}
          parentColumns={columns}
          columns={collapsedcolumns}
          editCollapsedRows={editCollapsedRows}
          isEditing={isEditing}
          addRow={addCollapsedRow}
        />
      )}
    </>
  );
}
