async function HandleRequest(request, setAuth) {
  try {
    const data = await request;
    return data;
  } catch (err) {
    if (err.statuscode === 401) {
      setAuth((auth) => ({ ...auth, isAuth: false, user: null }));
      return null;
    }
  }
}

export default HandleRequest;
