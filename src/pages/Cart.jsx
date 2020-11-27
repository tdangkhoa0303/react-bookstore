import { useContext, Fragment, useState } from "react";
import { useHistory } from "react-router";
import * as api from "../helpers/api";
import { Link } from "react-router-dom";

import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Container,
  Typography,
  Button,
  Box,
  Backdrop,
  Link as StyledLink,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Context from "../Context";

const headers = ["No", "Cover", "Title", "Action"];

const useStyles = makeStyles((theme) => ({
  cover: {
    width: theme.spacing(8),
    height: "auto",
  },
  button: {
    marginLeft: theme.spacing(2),
  },

  create: {
    float: "right",
  },

  backdrop: {
    zIndex: 10,
  },
}));

function Cart() {
  const { cart, removeFromCart, setCart } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const { auth: isAuth } = useContext(Context);

  const handleCreate = async (e) => {
    if (!isAuth) history.push("/signIn");
    setLoading(true);
    const { data } = await api.createTransaction();
    if (data.success) setCart([]);
    setLoading(false);
  };

  const renderRow = (row, index) => (
    <TableRow key={row._id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <img src={row.coverUrl} alt="book cover" className={classes.cover} />
      </TableCell>
      <TableCell>
        <Typography variant="h5">{row.title}</Typography>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(e) => removeFromCart(row._id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
  return (
    <Container>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Typography variant="h2">Cart</Typography>
      {cart.length ? (
        <Fragment>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((e, i) => (
                    <TableCell align="left" key={i}>
                      {e}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((row, index) => renderRow(row, index))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Create transaction
            </Button>
          </Box>
        </Fragment>
      ) : (
        <Typography variant="subtitle1">
          You've not added any book,{" "}
          <StyledLink component={Link} to="/">
            discover out library now!!
          </StyledLink>
        </Typography>
      )}
    </Container>
  );
}

export default Cart;
