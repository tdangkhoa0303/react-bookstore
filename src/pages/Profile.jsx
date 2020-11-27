import { Fragment, useEffect, useState, useContext } from "react";
import * as api from "../helpers/api";
import handleRequest from "../helpers/handleRequest";

import {
  Grid,
  Avatar,
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  TextField,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import Context from "../Context";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(16),
    width: theme.spacing(16),
  },

  grow: {
    flexGrow: 1,
  },

  userName: {
    fontSize: theme.spacing(5),
  },

  uploader: {
    display: "none",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#33333340",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },

  avatarContainer: {
    position: "relative",
    width: "fit-content",
    boxSizing: "border-box",
    marginRight: theme.spacing(4),
    overflow: "hidden",
    borderRadius: "50%",

    "&:hover > label": {
      display: "flex",
    },
  },

  field: {
    width: "100%",
  },
}));

function Profile() {
  const {
    auth: { user },
    setAuth,
  } = useContext(Context);

  const [avatar, setAvatar] = useState(user.avatarUrl);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState({
    title: {
      label: "Title",
      id: "title",
      name: "title",
      value: "",
      default: "",
      type: "text",
    },
    description: {
      label: "Description",
      id: "description",
      name: "description",
      value: "",
      default: "",
      type: "text",
    },
  });

  const handleFieldChange = (event, field) => {
    const value = event.target.value;
    const validated = field.validator ? field.validator(value) : true;

    setFields((fields) => ({
      ...fields,
      [field.name]: { ...field, validated, value },
    }));
  };

  const handleCoverChange = (event) => setCover(event.target.files[0]);

  const handleFileChange = async (event) => {
    const value = event.target.files[0];
    setLoading(true);
    const form = new FormData();
    form.append("avatar", value);
    const { data } = await handleRequest(api.postAvatar(form));

    if (data && data.success) setAvatar(URL.createObjectURL(value));
    console.log(data);
    setAuth((auth) => ({
      ...auth,
      user: { ...auth.user, avatarUrl: data.data.avatarUrl },
    }));
    setLoading(false);
  };

  const handleGiveAway = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.values(fields).forEach((field) =>
      form.append(field.name, field.value)
    );
    form.append("cover", cover);
    form.append("type", "giveaway");

    const {
      data: { data: response },
    } = await api.createBook(form);
    console.log(response);
  };

  const classes = useStyles();

  return (
    <Container>
      <Box mt={15}>
        {user && (
          <Fragment>
            <Box display="flex" mb={8}>
              <Box className={classes.avatarContainer}>
                <Avatar
                  src={avatar}
                  alt="user avatar"
                  className={classes.avatar}
                />
                <label
                  htmlFor="avatar"
                  className={classes.uploader}
                  style={{
                    cursor: loading ? "progress" : "pointer",
                    pointerEvents: loading ? "none" : "all",
                  }}
                >
                  <IconButton color="inherit">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
              <Box className={classes.grow}>
                <Typography variant="h2" className={classes.userName}>
                  {user.userName}
                </Typography>
                {/* <Typography variant="subtitle1" gutterBottom>
                    <b>{user.posts.length}</b>&nbsp;
                    {user.posts.length > 1 ? "posts" : "post"}
                  </Typography> */}
                <Typography variant="subtitle1" gutterBottom>
                  {user.email}
                </Typography>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </Box>
            </Box>
            <Box>
              <form autoComplete="off" onSubmit={handleGiveAway}>
                <Typography variant="h4" gutterBottom>
                  Give away book
                </Typography>
                <Grid container spacing={3}>
                  {Object.values(fields).map((field, index) => (
                    <Grid item xs={12} key={index}>
                      <TextField
                        variant="outlined"
                        label={field.label}
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        className={classes.field}
                        value={field.value}
                        onChange={(e) => handleFieldChange(e, field)}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <input
                      type="file"
                      name="cover"
                      id="cover"
                      onChange={handleCoverChange}
                    />
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button variant="contained" color="primary" type="submit">
                    Create
                  </Button>
                </Box>
              </form>
            </Box>
            <Grid container spacing={2}></Grid>
          </Fragment>
        )}
        <input
          type="file"
          name="avatar"
          id="avatar"
          hidden
          onChange={handleFileChange}
        />
      </Box>
    </Container>
  );
}

export default Profile;
