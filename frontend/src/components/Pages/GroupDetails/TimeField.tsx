import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { parse } from "date-fns";

interface IProps {
  value?: string;
  onChange: (value: any, keyboardInputValue?: string | undefined) => void;
  errorMessage?: string;
  label: string;
}

export default function ({
  value,
  onChange: handleChange,
  errorMessage,
  label,
}: IProps) {
  return (
    <TimePicker
      label={label}
      value={value ? parse(value, "HH:mm", new Date()) : new Date()}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          fullWidth
          required
          helperText={<>{errorMessage}</>}
          {...params}
        />
      )}
      ampm={false}
    />
  );
}
