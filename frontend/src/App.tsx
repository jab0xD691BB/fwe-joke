import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { RandomJokePage } from "./pages/RandomJoke/RandomJokePage";
import { theme } from "./theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route exact path="/random" component={RandomJokePage} />
            <Route exact path="/dashboard" component={DashboardPage} />
          </Switch>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
