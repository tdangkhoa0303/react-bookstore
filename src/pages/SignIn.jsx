import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Link as StyledLink,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../Context";

import Background from "../assets/book_lover.svg";

const useStyles = makeStyles((theme) => ({
  root: { width: "100%", overflow: "hidden", height: "100vh" },
  section: {
    display: "flex",
    justifyContent: " center",
    flexDirection: "column",
  },

  hero: {
    width: "100%",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    maxWidth: "30rem",

    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },

  field: { width: "100%" },
  nav: {
    boxShadow: "none",
    background: "none",
    color: "#333333",
  },
}));

function SignIn() {
  const [email, setEmail] = useState({
    value: "",
    validated: true,
    validator: (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  });

  const { signIn } = useContext(Context);

  const [password, setPassword] = useState({
    value: "",
    validated: true,
  });

  const handleSubmitForm = (event) => {
    event.preventDefault();
    signIn(email.value, password.value);
  };

  const classes = useStyles();

  return (
    <Box>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} md={6} className={classes.section}>
          <img src={Background} alt="social" className={classes.hero} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.section}>
          <form className={classes.form} onSubmit={handleSubmitForm}>
            <Typography variant="h4" paragraph color="primary">
              Sign in to access our awesome library...
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  className={classes.field}
                  value={email.value}
                  onChange={(e) =>
                    setEmail((email) => ({ ...email, value: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="password"
                  label="Password"
                  variant="outlined"
                  className={classes.field}
                  value={password.value}
                  onChange={(e) =>
                    setPassword((password) => ({
                      ...password,
                      value: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <StyledLink to="/whereismypassword " component={Link}>
                  Forgot password? Follow me...
                </StyledLink>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignIn;
