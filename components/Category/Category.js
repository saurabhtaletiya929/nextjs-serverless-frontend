import React, { useState, useEffect, use } from "react";
import styles from "./Category.module.css";
import { useQuery } from "@apollo/client";
import CATEGORY_QUERY from "./Category.graphql";
import Products from "~/components/Products";
import Link from "next/link";
import Head from "next/head";
import { Container } from "@mui/material";
// import { useRouter } from "next/router";

export const Category = ({ filters }) => {
  // const router = useRouter();
  const { loading, data, error } = useQuery(CATEGORY_QUERY, {
    variables: { filters },
  });
  const category = data?.categoryList[0];

  const categoryUrlSuffix = data?.storeConfig?.category_url_suffix ?? "";

  const backUrl =
    category?.breadcrumbs &&
    category?.breadcrumbs[0]?.category_url_path + categoryUrlSuffix;

  if (error) {
    console.error(error);
    return <div>💩 There was an error.</div>;
  }

  if (loading && !data) return <div>⌚️ Loading...</div>;

  return (
    <>
      <Container maxWidth="false">
        <Container maxWidth="xl" style={{ padding: "20px" }}>
          <Head>
            <title>{category?.name}</title>
          </Head>

          <div className={styles.category}>
            <header className={styles.header}>
              {backUrl && (
                <Link key={backUrl} href={backUrl}>
                  <span className={styles.backLink}>⬅</span>
                </Link>
              )}
              <h2>{category.name}</h2>
            </header>
            <>
              {category.children?.length > 0 && (
                <nav className={styles.categoriesListWrapper}>
                  <ul className={styles.categoriesList}>
                    {category.children.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={{
                            pathname: `/${
                              category.url_key + categoryUrlSuffix
                            }`,
                            query: { type: "CATEGORY" },
                          }}
                          as={`/${category.url_path + categoryUrlSuffix}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </>
          </div>
        </Container>
      </Container>
      <Products
        initialFilters={{
          category_id: { eq: category.id },
        }}
      /> 
    </>
  );
};
