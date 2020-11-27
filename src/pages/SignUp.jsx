import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import * as api from "../helpers/api";

import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    overflow: "hidden",
    paddingTop: "8rem",
  },

  field: {
    width: "100%",
  },

  form: {
    maxWidth: "40rem",
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },
  img: {
    width: "10rem",
    height: "auto",
  },

  uploader: {
    width: "3rem",
    backgroundColor: "red",
    heigh: "2rem",
  },

  stepper: {
    padding: "2rem 0",
    maxWidth: "40rem",
    width: "80%",
  },

  action: {
    margin: "1rem 0",
  },

  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    margin: "2rem 0",
    width: "10rem",
    height: "10rem",

    "& > img": {
      width: "100%",
      height: "unset",
    },
  },
}));

function SignUp() {
  const history = useHistory();
  const passwordRef = useRef();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

  const [fields, setFields] = useState({
    userName: {
      label: "Username",
      name: "userName",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12 },
    },
    email: {
      label: "Email",
      name: "email",
      value: "",
      validated: true,
      default: "",
      spacing: { xs: 12 },
      type: "email",
      validator: (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    },
    password: {
      label: "Password",
      name: "password",
      value: "",
      validated: true,
      default: "",
      type: "password",
      spacing: { xs: 12, md: 6 },
    },
    confirmPassword: {
      label: "Confirm password",
      name: "confirmPassword",
      value: "",
      validated: true,
      default: "",
      type: "password",
      spacing: { xs: 12, md: 6 },
      validator: (value) => value === passwordRef.current,
    },
  });

  useEffect(() => {
    passwordRef.current = fields.password.value;
  }, [fields.password.value]);

  const handleFieldChange = (event, field) => {
    const value = event.target.value;
    const validated = field.validator ? field.validator(value) : true;

    setFields((fields) => ({
      ...fields,
      [field.name]: { ...field, validated, value },
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      Object.values(fields).forEach((field) =>
        form.append(field.name, field.value)
      );

      const {
        data: { data: response },
      } = await api.postSignUp(form);
      console.log(response);
      if (response.success === "success") history.push("/signIn");
    } catch (err) {
      setError(err.message);
    }
  };
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box mt={8}>
        <form className={classes.form} onSubmit={handleSignUp}>
          <Typography variant="h4" paragraph color="primary">
            Sign Up to access our premium services...
          </Typography>
          <Grid container spacing={3}>
            {Object.values(fields).map((field, index) => (
              <Grid item {...field.spacing} key={index}>
                <TextField
                  variant="outlined"
                  label={field.label}
                  id={field.name}
                  name={field.name}
                  className={classes.field}
                  value={field.value}
                  error={!field.validated}
                  type={field.type}
                  onChange={(e) => handleFieldChange(e, field)}
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp;
