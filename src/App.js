import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./templates";
import {
  SignIn,
  Home,
  SignUp,
  ForgotPassword,
  Profile,
  Cart,
  Transaction,
} from "./pages";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { AppBar } from "./components";

import { Provider } from "./Context";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6ec6ff",
      main: "#2196f3",
      dark: "#0069c0",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider>
          <Router>
            <AppBar />
            <Box mb={10} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route
                exact
                path="/transactions"
                component={() => <PrivateRoute Component={Transaction} />}
              />
              <Route
                exact
                path="/profile"
                component={() => <PrivateRoute Component={Profile} />}
              />
              <Route
                exact
                path="/signIn"
                component={() => <PublicRoute Component={SignIn} />}
              />
              <Route
                exact
                path="/signUp"
                component={() => <PublicRoute Component={SignIn} />}
              />
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
