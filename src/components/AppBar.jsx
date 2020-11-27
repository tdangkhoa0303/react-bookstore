import { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Avatar,
  Badge,
} from "@material-ui/core";
import { ShoppingBasket, AssignmentTurnedIn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "../components";

import Context from "../Context";

import Logo from "../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#ffffff",
    boxShadow: "0px 4px 16px rgba(50, 50, 50, 0.1)",
    color: "#333333",
  },
  logo: { height: "2.5rem" },
  avatar: {
    margin: theme.spacing(0, 1, 0, 2),
  },
  cart: {
    margin: theme.spacing(0, 1),
  },
  title: { fontFamily: `'Sacramento', cursive`, flexGrow: 1 },
}));

function Public() {
  const { auth, cart } = useContext(Context);
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" aria-label="logo">
          <Link to="/">
            <img src={Logo} alt="logo" className={classes.logo} />
          </Link>
        </IconButton>
        <Typography variant="h4" className={classes.title}>
          teeBook
        </Typography>
        <Link to="/cart">
          <IconButton component="span" color="inherit">
            <Badge
              badgeContent={cart && cart.length}
              color="secondary"
              className={classes.cart}
            >
              <ShoppingBasket />
            </Badge>
          </IconButton>
        </Link>
        {auth.isAuth ? (
          <Box display="flex" alignItems="center">
            <Link to="/transactions">
              <IconButton color="inherit" component="span">
                <AssignmentTurnedIn />
              </IconButton>
            </Link>
            <Link to="/profile">
              <Avatar
                src={auth.user.avatarUrl}
                alt="user avatar"
                className={classes.avatar}
              />
            </Link>
            <Typography variant="subtitle1">
              Hello {auth.user.userName}
            </Typography>
          </Box>
        ) : (
          <Box>
            <Button href="/signUp" color="secondary">
              Sign Up
            </Button>
            <Button variant="contained" href="/signIn" color="primary">
              Sign In
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Public;
