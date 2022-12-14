import { Button, ButtonGroup } from "@mui/material";

interface IProps {
  selectedWeekDays: {
    selected: boolean;
    label: string;
  }[];
  handleClick: (id: string) => () => void;
  isEditing: boolean;
}

export default function ({ selectedWeekDays, handleClick, isEditing }: IProps) {
  return (
    <ButtonGroup>
      {[...selectedWeekDays.slice(1, 7), selectedWeekDays[0]].map(
        (selected) => (
          <Button
            key={selected.label}
            disabled={!isEditing}
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
