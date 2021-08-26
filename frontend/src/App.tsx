import * as React from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <DashboardPage />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
