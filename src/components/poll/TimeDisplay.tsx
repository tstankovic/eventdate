import { TimeType } from "../../utils/types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type TimeDisplayProps = {
  time: TimeType;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => (
  <Paper
    elevation={0}
    sx={{
      py: 1,
      px: 2,
      minHeight: 64,
      borderRadius: 2,
      backgroundColor: (theme) =>
        theme.palette.mode === "light" ? "grey.100" : "#181818",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {time.hour && time.minute ? `${time.hour}:${time.minute}` : "All day"}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label={time.votes.filter((v) => v.vote).length}
            color="success"
            icon={<CheckIcon fontSize="small" />}
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
          />
          <Chip
            label={time.votes.filter((v) => !v.vote).length}
            color="error"
            icon={<CloseIcon fontSize="small" />}
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
          />
        </Stack>
      </Box>
    </Box>
    <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap", mt: 1 }}>
      {time.votes.map((v) => (
        <Chip
          key={v.id}
          variant="outlined"
          label={v.name}
          color={v.vote ? "success" : "error"}
          size="small"
          icon={
            v.vote ? (
              <CheckIcon fontSize="small" />
            ) : (
              <CloseIcon fontSize="small" />
            )
          }
        />
      ))}
    </Stack>
  </Paper>
);

export default TimeDisplay;
