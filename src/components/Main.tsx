import { styled } from "@mui/material";

const MainWrapper = styled("main")({
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Main;
