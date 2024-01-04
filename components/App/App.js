import { useQuery } from "@apollo/client";
import React from "react";
import styles from "./App.module.css";
import APP_QUERY from "./App.graphql";
import NextNprogress from "nextjs-progressbar";
import Head from "next/head";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Container } from "@mui/material";

export const App = ({ children }) => {
  const { data } = useQuery(APP_QUERY);

  const store = data?.storeConfig;

  return (
    <>
      <NextNprogress
        startPosition={0.4}
        stopDelayMs={200}
        height={6}
        options={{ showSpinner: false, easing: "ease" }}
      />
      <Header storeConfig={store} />
      <Container maxWidth="xl" sx={{ minHeight: "500px", padding: "40px 0" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};
