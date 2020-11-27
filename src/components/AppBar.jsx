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
import { ShoppingBasket } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "../components";

import Context from "../Context";

import Logo from "../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "none",
    boxShadow: "none",
    color: "#333333",
  },
  logo: { height: "2.5rem" },
  avatar: {
    margin: theme.spacing(0, 1, 0, 4),
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
        {auth.isAuth ? (
          <Box display="flex" alignItems="center">
            <Link to="/cart">
              <Badge badgeContent={cart && cart.length} color="secondary">
                <ShoppingBasket />
              </Badge>
            </Link>
            <Avatar
              src={auth.user.avatarUrl}
              alt="user avatar"
              className={classes.avatar}
            />
            <Typography variant="subtitle1">
              Hello {auth.user.userName}
            </Typography>
          </Box>
        ) : (
          <Button href="/signUp" color="inherit">
            Create a new account
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Public;
