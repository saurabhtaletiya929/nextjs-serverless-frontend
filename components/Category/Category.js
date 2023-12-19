import React, { useState, useEffect, use } from "react";
import styles from "./Category.module.css";
import { useQuery } from "@apollo/client";
import CATEGORY_QUERY from "./Category.graphql";
import Products from "~/components/Products";
import Link from "next/link";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { Aside } from "../Aside/Aside";
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

  const [dynamicFilters, setDynamicFilters] = useState({
    category_id: [`${category.id}`],
  });
  const [showfilter, setShowfilters] = useState({});

  const ObjectConverterComponent = (inputObject) => {
    if (inputObject) {
      let convertedObject = {};

      Object.keys(inputObject).forEach((key) => {
        const valuesArray = inputObject[key];
        valuesArray.forEach((value) => {
          // const transformedKey = `${key}: { eq: "${value}" }`;
          convertedObject[key] = { eq: value };
        });
      });
      return convertedObject;
    }
  };
  // const updateQueryParams = () => {
  //   const queryParams = {};

  //   Object.keys(dynamicFilters).forEach((item) => {
  //     if (dynamicFilters[item].length > 0) {
  //       queryParams[item] = dynamicFilters[item].join(",");
  //     }
  //   });
  //   console.log(queryParams);

  //   // router.push({
  //   //   pathname: router.pathname,
  //   //   query: queryParams,
  //   // });
  // };

  const handleChangeEvent = (filterType, option) => {
    setDynamicFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      // If the filter category doesn't exist, initialize it as an array
      if (!newFilters[filterType]) {
        newFilters[filterType] = [];
      }

      // Check if the option is already selected, if yes, remove it; otherwise, add it
      if (newFilters[filterType].includes(option)) {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== option
        );
      } else {
        newFilters[filterType] = [...newFilters[filterType], option];
      }

      return newFilters;
    });
  };

  useEffect(() => {
    setShowfilters(ObjectConverterComponent(dynamicFilters));
  }, [dynamicFilters]);

  if (error) {
    console.error(error);
    return <div>💩 There was an error.</div>;
  }

  if (loading && !data) return <div>⌚️ Loading...</div>;

  return (
    <>
      {/* <Head>
        <title>{category?.name}</title>
      </Head> */}

      <div className={styles.category}>
        <Box className={styles.header}>
          {backUrl && (
            <Link key={backUrl} href={backUrl}>
              <span className={styles.backLink}>⬅</span>
            </Link>
          )}
          <Typography variant="h2">{category.name}</Typography>
        </Box>
        <>
          {category.children?.length > 0 && (
            <nav className={styles.categoriesListWrapper}>
              <ul className={styles.categoriesList}>
                {category.children.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={{
                        pathname: `/${category.url_key + categoryUrlSuffix}`,
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
      <Products filters={showfilter} handleChangeEvent={handleChangeEvent} />
    </>
  );
};
