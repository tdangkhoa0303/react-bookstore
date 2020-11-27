import { makeStyles, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import clsx from "clsx";

function Type({ className, type = "rent" }) {
  const useStyles = makeStyles((theme) => ({
    type: {
      position: "absolute",
      top: 0,
      background: fade(
        theme.palette[type === "rent" ? "primary" : "secondary"].light,
        0.9
      ),
      color: "#ffffff",
      borderRadius: theme.spacing(0, 0, 1, 0),
      left: 0,
      padding: theme.spacing(1, 2, 1, 1.5),
    },
  }));

  const classes = useStyles();

  return (
    <span className={clsx([classes.type, className])}>
      <Typography variant="body1">{type}</Typography>
    </span>
  );
}

export default Type;
