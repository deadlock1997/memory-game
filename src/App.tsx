import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import MainComponent from "./components/MainComponent/MainComponent";
import { useTheme } from "./Theme/theme";
import { CssBaseline } from "@mui/material";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainComponent />
    </ThemeProvider>
  );
}

export default App;
