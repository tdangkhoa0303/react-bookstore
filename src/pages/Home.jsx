import { useContext, useEffect, useState } from "react";

import { Grid, Container, Typography } from "@material-ui/core";

import { Book } from "../components";

import Context from "../Context";

function Home() {
  const {
    auth: { isAuth },
    books,
    getBooks,
    addToCart,
  } = useContext(Context);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isAuth) getBooks(page);
  }, [isAuth]);

  const renderBooks = (books) =>
    books
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((book) => book.available)
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
      <Grid container spacing={3}>
        {books.data && renderBooks(books.data)}
      </Grid>
    </Container>
  );
}

export default Home;
