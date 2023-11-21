import React, { useState, useEffect, use } from "react";
import styles from "./Category.module.css";
import { useQuery } from "@apollo/client";
import CATEGORY_QUERY from "./Category.graphql";
import Products from "~/components/Products";
import Link from "next/link";
import Head from "next/head";
import { Container } from "@mui/material";
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
    const convertToObject = (inputObject) => {
      let convertedObject = {};

      Object.keys(inputObject).forEach((key) => {
        const valuesArray = inputObject[key];
        valuesArray.forEach((value) => {
          // const transformedKey = `${key}: { eq: "${value}" }`;
          convertedObject[key] = { eq: value };
        });
      });

      // Use the convertedObject as needed
      setShowfilters(convertedObject);
    };

    if (inputObject) {
      convertToObject(inputObject);
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
    const updatedFilters = { ...dynamicFilters };

    if (!updatedFilters[filterType]) {
      updatedFilters[filterType] = [];
    }

    const index = updatedFilters[filterType].indexOf(option);

    if (index === -1) {
      updatedFilters[filterType].push(option);
    } else {
      updatedFilters[filterType].splice(index, 1);
    }

    setDynamicFilters(updatedFilters);
  };

  useEffect(() => {
    ObjectConverterComponent(dynamicFilters);
  }, [dynamicFilters]);

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
      <Aside
        filters={{
          category_id: { eq: category.id },
        }}
        handleChangeEvent={handleChangeEvent}
      ></Aside>

      {showfilter && <Products filters={showfilter} />}
      {/* <hr></hr>
      <Products
        filters={{
          category_id: { eq: category.id },
          color: { eq: "354" },
        }}
      /> */}
    </>
  );
};
