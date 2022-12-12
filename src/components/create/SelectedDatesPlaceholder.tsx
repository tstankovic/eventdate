import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SelectedDatesPlaceholder: React.FC = () => (
  <Box
    sx={{
      border: 1,
      borderStyle: "dashed",
      borderColor: "divider",
      borderRadius: 2,
      height: "100%",
      p: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography variant="h6" sx={{ textAlign: "center " }}>
      DATES & TIMES
    </Typography>
    <Typography variant="body1" color="GrayText" sx={{ textAlign: "center " }}>
      Select dates from the calendar to get started
    </Typography>
  </Box>
);

export default SelectedDatesPlaceholder;
