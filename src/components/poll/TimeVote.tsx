import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { TimeType } from "../../types";

type TimeVoteProps = {
  time: TimeType;
  value: boolean | null;
  registerVote: (time: number, vote: boolean) => void;
  isVoting: boolean;
};

const TimeVote: React.FC<TimeVoteProps> = ({
  time,
  value,
  registerVote,
  isVoting,
}) => (
  <Paper
    elevation={0}
    sx={{
      py: 1,
      px: 2,
      height: 64,
      borderRadius: 2,
      backgroundColor: (theme) =>
        theme.palette.mode === "light" ? "grey.100" : "#181818",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      {time.hour && time.minute ? `${time.hour}:${time.minute}` : "All day"}
    </Typography>
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton
        color={value === true ? "success" : "default"}
        sx={{
          border: 1,
          borderColor: value === true ? "success.main" : "transparent",
        }}
        onClick={() => registerVote(time.id, true)}
        disabled={isVoting}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        color={value === false ? "error" : "default"}
        sx={{
          border: 1,
          borderColor: value === false ? "error.main" : "transparent",
        }}
        disabled={isVoting}
        onClick={() => registerVote(time.id, false)}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  </Paper>
);

export default TimeVote;
