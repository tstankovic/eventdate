import React from "react";
import { useTheme } from "@mui/material";
import { v4 as uuid } from "uuid";
import { SelectedDate as SelectedDateType, Time } from "../../types";
import { HOURS, MINUTES } from "../../constants";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type SelectedDateProps = {
  selectedDate: SelectedDateType;
  remove: (date: SelectedDateType) => void;
  addTime: (date: SelectedDateType, time: Time) => void;
  removeTime: (date: SelectedDateType, time: Time) => void;
  removeTimes: (date: SelectedDateType) => void;
  changeTime: (
    e: SelectChangeEvent<string>,
    selectedDate: SelectedDateType,
    time: Time,
    prop: Exclude<keyof Time, "uuid">
  ) => void;
};

const SelectedDate: React.FC<SelectedDateProps> = ({
  selectedDate,
  remove,
  addTime,
  removeTime,
  removeTimes,
  changeTime,
}) => (
  <Box
    sx={{
      border: 1,
      borderColor: "divider",
      borderRadius: 2,
      p: 1,
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {selectedDate.date.format("dddd, D MMMM YYYY")}
      </Typography>
      <IconButton size="small" onClick={() => remove(selectedDate)}>
        <CloseIcon />
      </IconButton>
    </Box>
    {selectedDate.times.length ? (
      selectedDate.times.map((time) => (
        <Box
          key={time.uuid}
          sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, mb: 2 }}
        >
          <FormControl fullWidth>
            <InputLabel>Hour</InputLabel>
            <Select
              label="Hour"
              value={time.hours}
              onChange={(e) => changeTime(e, selectedDate, time, "hours")}
            >
              {HOURS.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography>:</Typography>
          <FormControl fullWidth>
            <InputLabel>Minute</InputLabel>
            <Select
              label="Minute"
              value={time.minutes}
              onChange={(e) => changeTime(e, selectedDate, time, "minutes")}
            >
              {MINUTES.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            onClick={() => removeTime(selectedDate, time)}
            sx={{
              border: 1,
              borderRadius: 2,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ))
    ) : (
      <React.Fragment>
        <Typography
          variant="body2"
          sx={{
            backgroundColor: "primary.main",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.primary.main),
            fontWeight: "bold",
            textAlign: "center",
            mt: 1,
            py: 1,
            borderRadius: 2,
            height: 40,
          }}
        >
          All day
        </Typography>
        <Typography variant="body2" sx={{ my: 1, textAlign: "center" }}>
          or
        </Typography>
      </React.Fragment>
    )}
    <Button
      variant="outlined"
      fullWidth
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        height: 40,
      }}
      onClick={() =>
        addTime(selectedDate, {
          uuid: uuid(),
          hours: HOURS[0],
          minutes: MINUTES[0],
        })
      }
    >
      Add a time
    </Button>
    {selectedDate.times.length ? (
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          height: 40,
          mt: 1,
        }}
        onClick={() => removeTimes(selectedDate)}
      >
        Switch to all day
      </Button>
    ) : null}
  </Box>
);

export default SelectedDate;
