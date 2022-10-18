import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme } from "./purpleTheme";

// El children en las props, es el equivalente a usar slots en vue
export const AppTheme = ({ children }) => {
  return (
   <ThemeProvider theme={ purpleTheme }>
    <CssBaseline />
    { children }
   </ThemeProvider>
  )
}
