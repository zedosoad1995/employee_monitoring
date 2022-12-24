import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(value: string, selectedValues: string[], theme: Theme) {
  return {
    fontWeight:
      selectedValues.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface IProps {
  values: { id: string; label: string }[];
  onChange: (newValues: string[]) => void;
}

export default function MultipleSelect({ values, onChange }: IProps) {
  const theme = useTheme();
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      typeof value === "string" ? value.split(",") : value
    );

    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Name</InputLabel>
        <Select
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}

        >
          {values.map((value) => (
            <MenuItem
              key={value.id}
              value={value.id}
              style={getStyles(value.id, selectedValues, theme)}
            >
              {value.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
