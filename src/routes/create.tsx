import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { v4 as uuid } from "uuid";
import { supabase } from "../utils/supabaseClient";
import { SelectedDate as SelectedDateType, Time } from "../utils/types";
import SelectedDate from "../components/create/SelectedDate";
import SelectedDatesPlaceholder from "../components/create/SelectedDatesPlaceholder";
import { styled } from "@mui/system";
import { Theme } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

const CreateWrapper = styled("div")(({ theme }) => ({
  flex: 1,
  backgroundColor:
    theme.palette.mode === "light"
      ? (theme as Theme).palette.grey[100]
      : "#181818",
  padding: "2rem 0",
}));

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [dates, setDates] = useState<Dayjs[]>([]);
  const [selectedDates, setSelectedDates] = useState<SelectedDateType[]>([]);
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const createDisabled = !title || !dates.length || isLoading;

  const handleChange = (date: Dayjs[] | null) => {
    const index = dates.findIndex((d) => d.isSame(date as unknown as Dayjs));
    if (index === -1) {
      setDates([...dates, date as unknown as Dayjs]);
      setSelectedDates([
        ...selectedDates,
        {
          date: date as unknown as Dayjs,
          times: [],
        },
      ]);
    }
  };

  const handleClose = (selectedDate: SelectedDateType) => {
    setDates(dates.filter((d) => !d.isSame(selectedDate.date)));
    setSelectedDates(
      selectedDates.filter((sd) => !sd.date.isSame(selectedDate.date))
    );
  };

  const addTime = (selectedDate: SelectedDateType, time: Time) => {
    setSelectedDates(
      selectedDates.map((sd) => {
        if (sd.date.isSame(selectedDate.date)) {
          selectedDate.times.push(time);
        }
        return sd;
      })
    );
  };

  const removeTime = (selectedDate: SelectedDateType, time: Time) => {
    setSelectedDates(
      selectedDates.map((sd) => {
        if (sd.date.isSame(selectedDate.date)) {
          sd.times = sd.times.filter((t) => t.uuid !== time.uuid);
        }
        return sd;
      })
    );
  };

  const removeTimes = (selectedDate: SelectedDateType) => {
    setSelectedDates(
      selectedDates.map((sd) => {
        if (sd.date.isSame(selectedDate.date)) {
          sd.times = [];
        }
        return sd;
      })
    );
  };

  const changeTime = (
    e: SelectChangeEvent<string>,
    selectedDate: SelectedDateType,
    time: Time,
    prop: Exclude<keyof Time, "uuid">
  ) => {
    const { value } = e.target;
    setSelectedDates(
      selectedDates.map((sd) => {
        if (sd.date.isSame(selectedDate.date)) {
          sd.times = sd.times.map((t) => {
            if (t.uuid === time.uuid) {
              return { ...t, [prop]: value };
            }
            return t;
          });
        }
        return sd;
      })
    );
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      const { data: polls } = await supabase
        .from("polls")
        .insert({ title, timezone, shortkey: uuid().slice(0, 8) })
        .select();

      let shortkey;
      if (polls && polls[0]) {
        const poll = polls[0];
        const pollId = poll.id;
        shortkey = poll.shortkey;

        for (let i = 0; i < selectedDates.length; i++) {
          const sd = selectedDates[i];
          const { data: date } = await supabase
            .from("dates")
            .insert({ date: sd.date, poll: pollId })
            .select();

          if (date && date[0]) {
            const dateId = date[0].id;
            if (sd.times.length) {
              await supabase.from("times").insert(
                sd.times.map((sdt) => ({
                  hour: sdt.hours,
                  minute: sdt.minutes,
                  date: dateId,
                }))
              );
            } else {
              await supabase.from("times").insert({ date: dateId });
            }
          }
        }
      }
      return navigate(`/p/${shortkey}/`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPickerDay = (
    date: Dayjs[],
    _: Dayjs[][],
    pickersDayProps: PickersDayProps<Dayjs[]>
  ) => {
    if (!dates) {
      return <PickersDay {...pickersDayProps} />;
    }
    const selected = dates.find((d) => d.isSame(date as unknown as Dayjs));
    if (selected) {
      return (
        <PickersDay
          {...pickersDayProps}
          sx={{
            backgroundColor: "primary.main",
            color: "common.white",
            "&:hover, &:focus": {
              backgroundColor: "primary.dark",
            },
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "50%",
          }}
        />
      );
    }
    return <PickersDay {...pickersDayProps} />;
  };

  return (
    <CreateWrapper>
      <Container maxWidth="md">
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "background.paper",
            p: 2,
          }}
        >
          <TextField
            label="Title"
            placeholder="Title"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!e.target.value) {
                setErrors({
                  ...errors,
                  title: "Please enter a title for your poll",
                });
              } else if (errors.title) {
                const errorsObj = { ...errors };
                delete errorsObj["title"];
                setErrors(errorsObj);
              }
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                setErrors({
                  ...errors,
                  title: "Please enter a title for your poll",
                });
              }
            }}
            error={Boolean(errors.title)}
            helperText={errors.title ? errors.title : " "}
          />
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Timezone</InputLabel>
            <Select
              label="Timezone"
              placeholder="Timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {(
                Intl as typeof Intl & {
                  supportedValuesOf: (prop: string) => string[];
                }
              )
                .supportedValuesOf("timeZone")
                .map((timezone: string) => (
                  <MenuItem key={timezone} value={timezone}>
                    {timezone}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Typography
            variant="subtitle2"
            color="GrayText"
            sx={{ mt: 3, mb: 1, fontWeight: "bold" }}
          >
            ANSWER OPTIONS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  "& .MuiPickerStaticWrapper-content": {
                    borderRadius: 2,
                  },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    value={dates}
                    onChange={handleChange}
                    renderDay={renderPickerDay}
                    renderInput={(params) => <TextField {...params} />}
                    displayStaticWrapperAs="desktop"
                    disablePast
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              {selectedDates.length ? (
                <Stack spacing={2}>
                  {selectedDates.map((sd, i) => (
                    <SelectedDate
                      key={i}
                      selectedDate={sd}
                      remove={handleClose}
                      addTime={addTime}
                      removeTime={removeTime}
                      removeTimes={removeTimes}
                      changeTime={changeTime}
                    />
                  ))}
                </Stack>
              ) : (
                <SelectedDatesPlaceholder />
              )}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              height: "3rem",
              mt: 3,
            }}
            disabled={createDisabled}
            onClick={handleCreate}
          >
            {isLoading ? "Creating new poll..." : "Create poll"}
          </Button>
        </Box>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </CreateWrapper>
  );
};

export default Create;
