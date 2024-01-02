import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import PRODUCTS_QUERY from "./Products.graphql";
import styles from "./Products.module.css";
import { resolveImage } from "~/lib/resolve-image";
import Link from "next/link";
import Price from "~/components/Price";
import Button from "~/components/Button";
import { SideBar } from "../SearchResults/SideBar";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import theme from "../../components/Theme";
import { Aside } from "../Aside/Aside";
import { useEffect } from "react";

const classes = makeStyles((theme) => ({
  Button: {
    color: theme.pallete.primary.light,
  },
}));

export const Products = ({ search, initialFilters }) => {
  const [filters, setFilters] = useState(null);
  const [avaiableFilters, setAvaiableFilters] = useState(null);
  const [productsData, setProductsData] = useState();

  const { loading, data, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: { search, filters: initialFilters },
    notifyOnNetworkStatusChange: true,
  });
  
  const page = data?.products?.page_info;
  const products = data?.products?.items || [];
  const aggregations = data?.products.aggregations || [];

  useEffect(() => {
    setFilters(aggregations)
  }, [aggregations]);

  useEffect(() => {
    setProductsData(products)
  }, [products]);
   

  const productUrlSuffix = data?.storeConfig.product_url_suffix ?? "";

  const handleFetchMore = useCallback(() => {
    if (loading || !page || page.current_page === page.total_pages) return;
    
    fetchMore({
      variables: {
        currentPage: page.current_page + 1, // next page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          products: {
            ...prev.products,
            ...fetchMoreResult.products,
            items: [...prev.products.items, ...fetchMoreResult.products.items],
          },
        };
      },
    });
  }, [loading, page, fetchMore]);
  
  const handleFilterClick = useCallback((filterOption) => {
    if (loading ) return;
    console.log("aggregations", aggregations)
    if(avaiableFilters) {
      const updatedAvaiableFilters = avaiableFilters.map(filter =>
        filter.attribute_code === filterOption.attribute_code
          ? {
              attribute_code: filterOption?.attribute_code,
              options: [...filter.options, ...[filterOption]]
            }
          : {
            attribute_code: filterOption?.attribute_code,
            options: [filterOption],
          }
      );
      console.log("updatedAvaiable", updatedAvaiableFilters)
      setAvaiableFilters([updatedAvaiableFilters]);
    } else {
      const updatedAvaiableFilters = {
        attribute_code: filterOption?.attribute_code,
        options: [filterOption],
      }
      setAvaiableFilters([updatedAvaiableFilters])
    }
    console.log("updatedAvaiable", avaiableFilters)
    // Toggle the selected state of the filter option
    
    // const updatedFilters = filters.map(filter =>
    //   filter.attribute_code === filterOption.attribute_code
    //     ? {
    //         ...filter,
    //         options: filter.options.map(option =>
    //           option.value == filterOption.value
    //             ? { ...option, selected: !option.selected }
    //             : option
    //         )
    //       }
    //     : filter
    // );
    // console.log("filterOption", updatedFilters)
    // setFilters(updatedFilters);

    // // Create a new GraphQL query based on the updated filters
    // const selectedFilterOptions = updatedFilters.reduce((selected, filter) => {
    //   const selectedOptions = filter.options.filter(option => option.selected);
    //   if (selectedOptions.length > 0) {
    //     selected[filter.attribute_code] = {
    //       in: selectedOptions.map(option => option.value)
    //     }
    //   }
    //   return selected;
    // }, {});
    
    // const selectedFilterOptionsFinal = {
    //   ...selectedFilterOptions,
    //   ...initialFilters
    // };
    // console.log("selectedFilterOptionsFinal", selectedFilterOptionsFinal)
    
    // fetchMore({
    //   variables: {
    //     filters: selectedFilterOptionsFinal
    //   },
    //   updateQuery: (prev, { fetchMoreResult }) => {
    //     if (!fetchMoreResult) return prev;
    //     return fetchMoreResult;
    //   },
    // });
  }, [loading, filters, fetchMore, avaiableFilters]);


  if (loading && !data) return <div>⌚️ Loading...</div>;

  if (products.length === 0) return <div>🧐 No products found.</div>;

  return (
    <>
    <Aside aggregations={aggregations} handleFilterClick={handleFilterClick} ></Aside>
      <Container maxWidth="xl">
      <main className="maincontainer">
        <section className={styles.products}>
          <div className={styles.productsList}>
            {productsData.map((product) => (
              <Link
                key={product.id}
                href={{
                  pathname: `/${product.url_key + productUrlSuffix}`,
                  query: { type: "PRODUCT" },
                }}
                as={`/${product.url_key + productUrlSuffix}`}
              >
                <article className={styles.productItem}>
                  <picture className={styles.productWrapper}>
                    <img
                      className={styles.productImage}
                      src={
                        resolveImage(product.thumbnail.url) +
                        "?width=520&height=640&webp=auto"
                      }
                      alt={product.thumbnail.label}
                      width={520}
                      height={640}
                      loading="lazy"
                    />
                  </picture>

                  <span className={styles.productName}>
                    {product.name}
                    <Price {...product.price_range} />
                  </span>
                </article>
              </Link>
            ))}
          </div>

          {page && page.current_page !== page.total_pages && (
            <Button type="button" onClick={handleFetchMore} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </Button>
          )}
        </section>
      </main>
    </Container>
    </>
    
  );
};
