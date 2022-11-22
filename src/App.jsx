import { ThemeProvider } from "styled-components";
import GeneralStyles from "./global";
import Home from "./pages/Home";
function App() {
  const theme = {
    dark: {
      headerColor: "#202c33",
      chatColor: "#111b21",
      border: "#3b3b3b",
      scroll: "#374045",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <GeneralStyles />
      <Home />
    </ThemeProvider>
  );
}

export default App;
