import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { GlobalStyle } from "./components/GlobalStyle";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { RandomJokePage } from "./pages/RandomJoke/RandomJokePage";
import { theme } from "./theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route exact path="/random" component={RandomJokePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
