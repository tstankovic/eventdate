import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const IndexWrapper = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Index: React.FC = () => (
  <IndexWrapper>
    <Typography variant="h2" sx={{ fontWeight: "light", textAlign: "center" }}>
      Don't know when?
    </Typography>
    <Typography
      variant="h3"
      sx={{
        mt: 1,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      Decide with a poll
    </Typography>
    <Button
      variant="contained"
      size="large"
      sx={{ mt: 6, fontWeight: "bold", borderRadius: "20px" }}
    >
      <RouterLink
        to="/create"
        style={{ textDecoration: "none", color: "#fff" }}
      >
        Create poll
      </RouterLink>
    </Button>
    <Typography sx={{ mt: 1 }} variant="caption" color="GrayText">
      No sign-up required
    </Typography>
  </IndexWrapper>
);

export default Index;
