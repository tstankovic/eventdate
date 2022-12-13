import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { DAYS, MONTHS } from "../constants";
import { usePoll } from "../routes/poll";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TimeDisplay from "../components/poll/TimeDisplay";

const Result: React.FC = () => {
  const { poll } = usePoll();
  const { dates, timezone } = poll;

  const [showBackToVotingBtn, setShowBackToVotingBtn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fromVoting) {
      setShowBackToVotingBtn(true);
      history.replaceState({}, "");
    }
  }, []);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
        p: 2,
      }}
    >
      <Typography
        variant="body2"
        color="GrayText"
        sx={{ mt: 2, fontWeight: "bold" }}
      >
        RESULTS
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
                    <TimeDisplay key={t.id} time={t} />
                  ))}
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Stack>
      {showBackToVotingBtn && (
        <Button
          to=".."
          component={Link}
          variant="outlined"
          size="large"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            height: "3rem",
            mt: 2,
          }}
        >
          Back to voting
        </Button>
      )}
    </Box>
  );
};

export default Result;
