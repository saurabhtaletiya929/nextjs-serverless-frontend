import React, { useCallback } from "react";
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

const classes = makeStyles((theme) => ({
  Button: {
    color: theme.pallete.primary.light,
  },
}));

export const Products = ({ search, filters }) => {
  const { loading, data, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: { search, filters },
    notifyOnNetworkStatusChange: true,
  });
  const page = data?.products.page_info;
  const products = data?.products.items || [];
  // const aggregations = data?.products.aggregations || [];

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

  if (loading && !data) return <div>⌚️ Loading...</div>;

  if (products.length === 0) return <div>🧐 No products found.</div>;

  return (
    <Container maxWidth="xl">
      <main className="maincontainer">
        <section className={styles.products}>
          <div className={styles.productsList}>
            {products.map((product) => (
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
  );
};
