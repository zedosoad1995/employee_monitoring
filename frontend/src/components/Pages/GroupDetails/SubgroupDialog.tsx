import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ISubgroup, IsubgroupTypes } from "../../../types/subgroup";
import TimeField from "./TimeField";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ISubgroupSchema,
  SubgroupSchema,
} from "../../../config/schemas/subgroup";
import { format } from "date-fns";
import { SUBGROUP_TYPES } from "../../../constants";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
  isCreate?: boolean;
  subgroup?: ISubgroup;
  setSubgroup: React.Dispatch<React.SetStateAction<ISubgroup | undefined>>;
  onSubmit: (data: any) => void;
}

export default function ({
  open,
  isCreate,
  onClose: handleClose,
  subgroup,
  setSubgroup,
  onSubmit: prepareSubmit,
}: IProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISubgroupSchema>({
    defaultValues: {
      startTime: subgroup?.startTime,
      endTime: subgroup?.endTime,
      breaks: subgroup?.Break ? subgroup.Break : [],
    },
    resolver: yupResolver(SubgroupSchema),
    mode: "onChange",
  });

  const handleAddBreak = () => {
    if (!subgroup || !subgroup.Break) return;

    subgroup.Break.push({
      id: uuidv4(),
      startTime: "00:00",
      endTime: "00:00",
    });
    setValue("breaks", subgroup.Break);
    setSubgroup({ ...subgroup });
  };

  const handleRemoveBreak = (row: number) => () => {
    if (!subgroup || !subgroup.Break) return;

    subgroup.Break.splice(row, 1);
    setValue("breaks", subgroup.Break);
    setSubgroup({ ...subgroup });
  };

  const changeSubgroupTime =
    (property: IsubgroupTypes, row?: number) =>
    (value: any, keyboardInputValue?: string) => {
      let keyForm: string;
      let keyState: string;
      let isBreak = false;
      if (
        [SUBGROUP_TYPES.START_TIME, SUBGROUP_TYPES.END_TIME].includes(property)
      ) {
        keyForm = property;
        keyState = property;
      } else if (property === SUBGROUP_TYPES.BREAK_START_TIME) {
        keyForm = `breaks.${row}.${SUBGROUP_TYPES.START_TIME}`;
        keyState = SUBGROUP_TYPES.START_TIME;
        isBreak = true;
      } else if (property === SUBGROUP_TYPES.BREAK_END_TIME) {
        keyForm = `breaks.${row}.${SUBGROUP_TYPES.END_TIME}`;
        keyState = SUBGROUP_TYPES.END_TIME;
        isBreak = true;
      } else {
        return;
      }

      if (keyboardInputValue !== undefined) {
        // @ts-ignore
        setValue(keyForm, keyboardInputValue);
        setSubgroup((prevSubgroup) => {
          if (prevSubgroup) {
            if (isBreak) {
              if (prevSubgroup.Break && row !== undefined) {
                // @ts-ignore
                prevSubgroup.Break[row][keyState] = keyboardInputValue;
              }
            } else {
              // @ts-ignore
              prevSubgroup[keyState] = keyboardInputValue;
            }
            return { ...prevSubgroup };
          }
        });
      } else if (value) {
        // @ts-ignore
        setValue(keyForm, format(value, "HH:mm"));
        setSubgroup((prevSubgroup) => {
          if (prevSubgroup) {
            if (isBreak) {
              if (prevSubgroup.Break && row !== undefined) {
                // @ts-ignore
                prevSubgroup.Break[row][keyState] = format(value, "HH:mm");
              }
            } else {
              // @ts-ignore
              prevSubgroup[keyState] = format(value, "HH:mm");
            }
            return { ...prevSubgroup };
          }
        });
      }
    };

  useEffect(() => {
    if (subgroup && subgroup?.Break) {
      subgroup.Break.sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
      });

      setValue("breaks", subgroup.Break);
      console.log(subgroup.Break);
    }
  }, [JSON.stringify(subgroup?.Break)]);

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>
        {isCreate && <>Create New Schedule</>}
        {!isCreate && <>Edit Schedule</>}
      </DialogTitle>
      <DialogContent sx={{ mt: 1, maxWidth: "600px" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form
            id="groupsForm"
            onSubmit={handleSubmit(prepareSubmit)}
            noValidate
          >
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="startTime"
                    defaultValue={subgroup?.startTime}
                    render={({ field: { value } }) => (
                      <TimeField
                        value={value}
                        onChange={changeSubgroupTime(SUBGROUP_TYPES.START_TIME)}
                        errorMessage={errors.startTime?.message}
                        label="Start Time"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="endTime"
                    defaultValue={subgroup?.endTime}
                    render={({ field: { value } }) => (
                      <TimeField
                        value={value}
                        onChange={changeSubgroupTime(SUBGROUP_TYPES.END_TIME)}
                        errorMessage={errors.endTime?.message}
                        label="End Time"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <Typography sx={{ mt: "auto", mb: "auto" }}>Breaks</Typography>
                <Tooltip title="Add Break">
                  <IconButton onClick={handleAddBreak}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </div>

              <Stack spacing={2}>
                {subgroup?.Break &&
                  subgroup?.Break.map((b, index) => {
                    return (
                      <div
                        key={b.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <Controller
                          control={control}
                          name={`breaks.${index}.startTime`}
                          defaultValue={b.startTime}
                          render={() => (
                            <TimeField
                              value={b.startTime}
                              onChange={changeSubgroupTime(
                                SUBGROUP_TYPES.BREAK_START_TIME,
                                index
                              )}
                              errorMessage={
                                errors.breaks &&
                                errors.breaks[index]?.startTime?.message
                              }
                              label="Start Time"
                            />
                          )}
                        />

                        <Controller
                          control={control}
                          name={`breaks.${index}.endTime`}
                          defaultValue={b.endTime}
                          render={() => (
                            <TimeField
                              value={b.endTime}
                              onChange={changeSubgroupTime(
                                SUBGROUP_TYPES.BREAK_END_TIME,
                                index
                              )}
                              errorMessage={
                                errors.breaks &&
                                errors.breaks[index]?.endTime?.message
                              }
                              label="End Time"
                            />
                          )}
                        />

                        <IconButton
                          onClick={handleRemoveBreak(index)}
                          sx={{ height: "fit-content" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    );
                  })}
              </Stack>
            </Box>
          </form>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="groupsForm">
          {isCreate ? "Create" : "Edit"}
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
