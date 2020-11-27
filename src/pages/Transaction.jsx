import { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Link as StyledLink,
  IconButton,
} from "@material-ui/core";
import {
  CheckCircle,
  CheckCircleOutline,
  FiberManualRecord,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import * as api from "../helpers/api";
import Context from "../Context";

const headers = ["No", "Cover", "Title", "Type", "Action"];

const useStyles = makeStyles((theme) => ({
  cover: {
    width: theme.spacing(8),
    height: "auto",
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  checked: {
    padding: theme.spacing(1.5, 0),
  },

  create: {
    float: "right",
  },
}));

function Transaction() {
  const {
    auth: { isAuth },
  } = useContext(Context);

  const [transactions, setTransactions] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.getTransactions();
      console.log(data);
      if (data.success) setTransactions(data.data.transactions);
    };

    if (isAuth) fetchTransactions();
  }, [isAuth]);

  const handleComplete = async (id) => {
    setTransactions((transactions) => {
      const index = transactions.findIndex((item) => item._id === id);

      if (index < 0) return transactions;
      const transaction = transactions[index];

      return [
        ...transactions.slice(0, index),
        {
          ...transaction,
          isComplete: true,
        },
        ...transactions.slice(index + 1),
      ];
    });

    await api.completeTransaction(id);
  };

  const renderRow = (row, index) => (
    <TableRow key={row._id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <img
          src={row.book.coverUrl}
          alt="book cover"
          className={classes.cover}
        />
      </TableCell>
      <TableCell>
        <Typography variant="h5">{row.book.title}</Typography>
      </TableCell>
      <TableCell>
        <FiberManualRecord
          color={row.book.type === "rent" ? "primary" : "secondary"}
        />
      </TableCell>
      <TableCell>
        {row.isComplete ? (
          <CheckCircle color="primary" className={classes.checked} />
        ) : (
          <IconButton
            edge="start"
            color="primary"
            onClick={(event) => handleComplete(row._id)}
          >
            <CheckCircleOutline />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <Container>
      <Typography variant="h2">Transactions</Typography>
      {transactions.length ? (
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
                {transactions.map((row, index) => renderRow(row, index))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <Typography variant="subtitle1">
          You have no transaction, &nbsp;
          <StyledLink component={Link} to="/">
            discover out library now!!
          </StyledLink>
        </Typography>
      )}
    </Container>
  );
}

export default Transaction;
