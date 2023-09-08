import React, { useReducer, useState, useEffect } from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider, theme, Box } from "@chakra-ui/react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authorize from "./Authorize";
 /*import Login from "./Login"; */

import axios from "axios";

import SidebarWithHeader from "./SidebarWithHeader";
import Home from "./components/home/Home";
import jwt from "jwt-decode";

import { Context } from "./context/context";
//import Setting from "./components/setting/Setting";

const initialValue = {
  userId: 0,
  username: "",
  docName: "",
  docNo: "",
  officeId: 0,
  officeName: "",
  courtCode: "",
  sourceURL: "",
  sourceIP: "",
  destIP: "",
  destURL: "",
  isAuthen: false,
  found: [],
  notFound: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "info":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "logout":
      return null;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function AppRouter() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const [isAuthen, setIsAuthen] = useState(false);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("token"));
    console.log("token",localStorage.getItem("token"))

    if (data) {
      var jwtExtract = jwt(data.token);
      console.log(jwtExtract);

      dispatch({
        type: "info",
        payload: { key: "userId", value: data.user_id },
      });

      dispatch({
        type: "info",
        payload: { key: "username", value: data.user_username },
      });

      dispatch({
        type: "info",
        payload: { key: "officeId", value: data.office_id },
      });

      dispatch({
        type: "info",
        payload: { key: "officeName", value: data.office_name },
      });

      dispatch({
        type: "info",
        payload: { key: "courtCode", value: data.office_code },
      });

      dispatch({
        type: "info",
        payload: { key: "isAuthen", value: true },
      });

      async function fetchData() {
        const serverURL = `http://10.1.2.48:8080/api/collections/court_env/records?filter=(court_code='${data.office_code}')`;
        console.log(serverURL);

        await axios.get(serverURL).then(
          (response) => {
            console.log("####IP####");
            console.log(response.data);
            console.log(response.data.totalItems);

            if (response.data.totalItems > 0) {
              console.log(response.data.items[0].ip);
              dispatch({
                type: "info",
                payload: { key: "destIP", value: response.data.items[0].ip },
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }

      fetchData();

      setIsAuthen(true);
    } else {
      setIsAuthen(false);
    }
  }, []);

  console.log("#### ROUTE ###");
  console.log("isAuthen :",isAuthen);
  return (
    <Context.Provider value={{ state, dispatch }}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/authorize/:authorize" element={<Authorize />} />
        </Routes>
        {isAuthen ? (
          <SidebarWithHeader>
            <Routes>
              <>
                <Route exact path="/" element={<Home />} />
              </>
            </Routes>
          </SidebarWithHeader>
        ) : (
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        )}
      </BrowserRouter>
    </ChakraProvider>
  </Context.Provider>
);
}
export default AppRouter;
