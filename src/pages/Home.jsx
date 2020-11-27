import { useContext, useEffect, useState } from "react";

import { Grid, Container, Typography, Chip, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FilterVintage } from "@material-ui/icons";

import { Book } from "../components";

import Context from "../Context";

const useStyles = makeStyles((theme) => ({
  filter: {
    marginRight: theme.spacing(2),
  },
}));

const filters = [
  {
    label: "Rent",
    value: "rent",
    color: "primary",
  },
  {
    label: "Giveaway",
    value: "giveaway",
    color: "secondary",
  },
  {
    label: "All",
    value: "all",
  },
];

function Home() {
  const {
    auth: { isAuth },
    books,
    getBooks,
    addToCart,
  } = useContext(Context);

  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isAuth) getBooks(page);
  }, [isAuth]);

  const renderBooks = (books) =>
    books
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter(
        (book) =>
          book.available && (filter !== "all" ? book.type === filter : true)
      )
      .map((book) => (
        <Grid item xs={6} md={4} xl={3} key={book._id}>
          <Book book={book} action={addToCart} />
        </Grid>
      ));

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        teeLibrary
      </Typography>
      <Box mb={4}>
        {filters.map((e, index) => (
          <Chip
            key={index}
            icon={<FilterVintage />}
            color={e.color}
            label={e.label}
            onClick={() => setFilter(e.value)}
            className={classes.filter}
            variant={filter === e.value ? "default" : "outlined"}
          />
        ))}
      </Box>
      <Grid container spacing={3}>
        {books.data && renderBooks(books.data)}
      </Grid>
    </Container>
  );
}

export default Home;
