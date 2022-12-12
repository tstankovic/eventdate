import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import logo from "../assets/logo.png";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const HeaderWrapper = styled("header")({
  height: "5rem",
  padding: "1rem",
});

type HeaderProps = {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

const Header: React.FC<HeaderProps> = ({ mode, setMode }) => {
  const handleModeChange = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("eventdate-mode", newMode);
  };

  return (
    <HeaderWrapper sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <IconButton onClick={handleModeChange}>
          {mode === "light" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
