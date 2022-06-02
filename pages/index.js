import { ThemeProvider } from "@mui/material/styles";

import { CssBaseline } from "@mui/material";
// import BaseRoute from "../routes/base-route";

import theme from "../styles/theme";
import LoginScreen from "./login";
// import SignupScreen from "./signup";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginScreen />
      {/* <BaseRoute /> */}
      {/* <SignupScreen /> */}
    </ThemeProvider>
  );
}
