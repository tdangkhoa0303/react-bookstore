import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "./helpers/cookieHelper";
import * as api from "./helpers/api";

import handleRequest from "./helpers/handleRequest";

import { v4 } from "uuid";

const Context = React.createContext();

export function Provider(props) {
  const [auth, setAuth] = useState({ isAuth: null, user: null });
  const [books, setBooks] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await api.getUser();
      if (authData.success)
        setAuth((auth) => ({
          ...auth,
          isAuth: true,
          user: authData.data.user,
        }));
      const { data: cartData } = await api.getCart();
      if (cartData.success) setCart(cartData.data.cart);
    };

    const isLogin = getCookie("userId");
    if (isLogin) fetchUser();
  }, []);

  const signIn = async (email, password) => {
    try {
      const { data } = await api.postSignIn(email, password);
      if (data.success)
        setAuth((auth) => ({ ...auth, isAuth: true, user: data.data.user }));
    } catch (err) {
      console.log(err);
      setAuth({ isAuth: false, user: null });
    }
  };

  const getBooks = async (page) => {
    const { data } = await handleRequest(api.getBooks(page), setAuth);
    if (data && data.success) {
      const fetchedBooks = data.data;

      setBooks(fetchedBooks);
      return fetchedBooks;
    }
    return null;
  };

  const addToCart = async (id) => {
    setBooks((books) => {
      const data = books.data;
      const index = data.findIndex((book) => book._id === id);
      if (index < 0) return books;
      const book = data[index];

      setCart((cart) => [...cart, book]);

      return {
        ...books,
        data: [
          ...data.slice(0, index),
          {
            ...book,
            available: false,
          },
          ...data.slice(index + 1),
        ],
      };
    });

    const { data } = await handleRequest(api.addToCart(id));
    if (data && data.success) {
      const { cart: newCart } = data.data;

      return newCart;
    }

    return null;
  };

  const removeFromCart = async (id) => {
    setCart((cart) => {
      const index = cart.findIndex((item) => item._id === id);
      return [...cart.slice(0, index), ...cart.slice(index + 1)];
    });
    const { data } = await handleRequest(api.removeFromCart(id));
    if (data && data.success) {
      const { cart: newCart } = data.data;
      return newCart;
    }

    return null;
  };

  return (
    <Context.Provider
      value={{
        auth,
        signIn,
        setAuth,
        getBooks,
        addToCart,
        removeFromCart,
        setCart,
        books,
        cart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
