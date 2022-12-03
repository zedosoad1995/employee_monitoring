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
import { ISubgroup } from "../../../types/subgroup";
import TimeField from "./TimeField";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ISubgroupSchema,
  SubgroupSchema,
} from "../../../config/schemas/subgroup";
import { format } from "date-fns";

interface IProps {
  open: boolean;
  onClose: () => void;
  isCreate?: boolean;
  subgroup?: ISubgroup;
}

export default function ({
  open,
  isCreate,
  onClose: handleClose,
  subgroup,
}: IProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<ISubgroupSchema>({
    defaultValues: {
      startTime: subgroup?.startTime,
      endTime: subgroup?.endTime,
      breaks: subgroup?.Break ? subgroup.Break : [],
    },
    resolver: yupResolver(SubgroupSchema),
    mode: "onSubmit",
  });

  // TODO
  const prepareSubmit = (data: any) => {
    console.log(data);
    console.log(getValues("startTime"));
  };

  const handleStartTimeChange = (value: any, keyboardInputValue?: string) => {
    if (keyboardInputValue && /\d{2}:\d{2}/.test(keyboardInputValue)) {
      setValue("startTime", keyboardInputValue);
    } else {
      if (!isNaN(value)) {
        setValue("startTime", format(value, "HH:mm"));
      }
    }
  };

  const handleEndTimeChange = (value: any, keyboardInputValue?: string) => {
    if (keyboardInputValue && /\d{2}:\d{2}/.test(keyboardInputValue)) {
      setValue("endTime", keyboardInputValue);
    } else {
      if (!isNaN(value)) {
        setValue("endTime", format(value, "HH:mm"));
      }
    }
  };

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
                        onChange={handleStartTimeChange}
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
                        onChange={handleEndTimeChange}
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
                  <IconButton onClick={() => {}}>
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
                              onChange={() => {}}
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
                              onChange={() => {}}
                              errorMessage={
                                errors.breaks &&
                                errors.breaks[index]?.endTime?.message
                              }
                              label="End Time"
                            />
                          )}
                        />

                        <IconButton
                          onClick={() => {}}
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
