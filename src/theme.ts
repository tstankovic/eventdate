import { createTheme, responsiveFontSizes, Theme } from "@mui/material";

export type ThemeMode = "light" | "dark";

export const getTheme = (mode: ThemeMode): Theme => {
  let theme = createTheme({
    palette: { mode },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};
