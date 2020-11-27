import { useContext, Fragment } from "react";

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
  Link,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
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
}));

function Cart() {
  const { cart, removeFromCart } = useContext(Context);

  const classes = useStyles();

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
            <Button variant="contained" color="primary">
              Create transaction
            </Button>
          </Box>
        </Fragment>
      ) : (
        <Typography variant="subtitle1">
          You've not added any book,{" "}
          <Link href="/">discover out library now!!</Link>
        </Typography>
      )}
    </Container>
  );
}

export default Cart;
