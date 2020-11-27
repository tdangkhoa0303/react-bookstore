import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";

import { ShoppingCart } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import { Type } from "./";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 4px 16px rgba(50, 50, 50, 0.1)",
    position: "relative",
  },

  cart: {
    float: "right",
  },

  description: {
    maxHeight: theme.spacing(5),
    height: theme.spacing(5),
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  },
}));

function Book({ book, action, ActionIcon }) {
  const classes = useStyles();

  const handleActionClick = (event) => {
    action(book._id);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt="book cover"
        height="140"
        image={book.coverUrl}
        title={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" noWrap>
          {book.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.description}
        >
          {book.description}
        </Typography>
        <IconButton
          edge="end"
          className={classes.cart}
          onClick={handleActionClick}
        >
          {ActionIcon ? <ActionIcon /> : <ShoppingCart />}
        </IconButton>
        <Type type={book.type} />
      </CardContent>
    </Card>
  );
}

export default Book;
