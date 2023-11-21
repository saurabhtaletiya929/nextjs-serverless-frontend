import React from "react";
import { useQuery } from "@apollo/client";
import styles from "./Home.module.css";
import Cms from "../Cms";
import APP_QUERY from "../App/App.graphql";

export const Home = () => {
  const { data } = useQuery(APP_QUERY);
  const store = data?.storeConfig;
  const cms_home_page = store?.cms_home_page ?? "home";

  return (
    <div className={styles.home}>
      <Cms identifier={cms_home_page} />
    </div>
  );
};
