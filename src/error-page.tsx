import { Link, useRouteError } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ErrorType = {
  statusText?: string;
  message?: string;
};

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="body1">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" color="GrayText">
        <i>{(error as ErrorType).statusText || (error as ErrorType).message}</i>
      </Typography>
      <Button
        to="/"
        component={Link}
        variant="outlined"
        sx={{ mt: 1, fontWeight: "bold" }}
      >
        Return to homepage
      </Button>
    </Box>
  );
};

export default ErrorPage;
