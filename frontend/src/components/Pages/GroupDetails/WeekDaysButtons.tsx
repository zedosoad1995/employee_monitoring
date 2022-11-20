import { Button, ButtonGroup } from "@mui/material";

interface IProps {
  selectedWeekDays: {
    selected: boolean;
    label: string;
  }[];
  handleClick: (id: string) => () => void;
}

export default function ({ selectedWeekDays, handleClick }: IProps) {
  return (
    <ButtonGroup>
      {[...selectedWeekDays.slice(1, 7), selectedWeekDays[0]].map(
        (selected) => (
          <Button
            key={selected.label}
            variant={selected.selected ? "contained" : "outlined"}
            onClick={handleClick(selected.label)}
          >
            {selected.label}
          </Button>
        )
      )}
    </ButtonGroup>
  );
}
