import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const loginData = localStorage.getItem("blog");
    // console.log(loginData);

    if (loginData) {
      const parseData = JSON.parse(loginData);
      setAuth({
        ...auth,
        user: parseData?.loginData,
        token: parseData?.token,
      });
    } else {
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
