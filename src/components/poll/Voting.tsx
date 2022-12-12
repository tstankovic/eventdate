import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { DAYS, MONTHS } from "../../constants";
import { usePoll } from "../../routes/poll";
import TimeVote from "./TimeVote";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Voting: React.FC = () => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isVoting, setIsVoting] = useState(false);

  const { poll, votes, registerVote, handleVote } = usePoll();
  const { timezone, dates } = poll;

  const voteDisabled =
    isVoting || !name || Object.keys(votes).every((k) => votes[+k] === null);

  return (
    <>
      <TextField
        label="Your name"
        placeholder="Type your name here"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (!e.target.value) {
            setErrors({
              ...errors,
              name: "Please enter your name",
            });
          } else if (errors.name) {
            const errorsObj = { ...errors };
            delete errorsObj["name"];
            setErrors(errorsObj);
          }
        }}
        onBlur={(e) => {
          if (!e.target.value) {
            setErrors({
              ...errors,
              name: "Please enter your name",
            });
          }
        }}
        disabled={isVoting}
        error={Boolean(errors.name)}
        helperText={errors.name ? errors.name : " "}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Typography
        variant="body2"
        color="GrayText"
        sx={{ mt: 1, fontWeight: "bold" }}
      >
        SELECT AS MANY OPTIONS AS YOU WOULD LIKE:
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
        Timezone: {timezone}
      </Typography>
      <Stack spacing={1} sx={{ mt: 2 }}>
        {dates.map((d) => {
          const date = dayjs(d.date);
          return (
            <Box key={d.id} sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "primary.main",
                  color: (theme) =>
                    theme.palette.getContrastText(theme.palette.primary.main),
                  borderRadius: 2,
                  px: 1,
                  minHeight: "4rem",
                  minWidth: "4rem",
                }}
              >
                <Typography variant="caption">
                  {DAYS[date.day()]} {date.date()}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {MONTHS[date.month()]}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack spacing={1}>
                  {d.times.map((t) => (
                    <TimeVote
                      key={t.id}
                      time={t}
                      value={votes[t.id]}
                      registerVote={registerVote}
                      isVoting={isVoting}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Stack>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          height: "3rem",
          mt: 2,
        }}
        disabled={voteDisabled}
        onClick={() => {
          setIsVoting(true);
          handleVote(name);
        }}
      >
        {isVoting ? "Voting..." : "Vote"}
      </Button>
      <Button
        to="results"
        component={Link}
        variant="outlined"
        size="large"
        fullWidth
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          height: "3rem",
          mt: 1,
        }}
        disabled={isVoting}
      >
        View results
      </Button>
    </>
  );
};

export default Voting;
