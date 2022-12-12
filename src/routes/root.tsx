import { useState, useMemo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getTheme } from "../theme";
import { CssBaseline, styled, ThemeProvider } from "@mui/material";
import Header from "../components/Header";
import Main from "../components/Main";

const RootWrapper = styled("div")({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

const Root: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    document.title = "Eventdate";
    const storedMode = localStorage.getItem("eventdate-mode");
    if (storedMode) {
      setMode(storedMode as "light" | "dark");
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RootWrapper>
          <Header mode={mode} setMode={setMode} />
          <Main>
            <Outlet />
          </Main>
        </RootWrapper>
      </ThemeProvider>
    </>
  );
};

export default Root;
