import React, { useState } from "react";
import styles from "./MiniSearch.module.css";
import SEARCHRESULTS_QUERY from "./SearchResults.graphql";

import { useQuery } from "@apollo/client";
import { resolveImage } from "~/lib/resolve-image";
import Link from "next/link";
import Price from "~/components/Price";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const SearchResults = ({
  search,
  filters,
  handleClick,
  showDropdown,
  goToSearchResults,
}) => {
  const router = useRouter();

  const { loading, data, fetchMore } = useQuery(SEARCHRESULTS_QUERY, {
    variables: { search, filters },
    notifyOnNetworkStatusChange: true,
  });

  const products = data?.products.items || [];
  const productUrlSuffix = data?.storeConfig.product_url_suffix ?? "";

  if (search.length > 2) {
    if (loading && !data)
      return (
        <div className={styles.searchresult_container}>⌚️ Loading...</div>
      );

    if (products.length === 0)
      return (
        <div className={styles.searchresult_container}>
          🧐 No products found.
        </div>
      );

    return (
      <>
        {showDropdown && (
          <div className={styles.searchresult_container}>
            <main className="maincontainer">
              <div className={styles.search_header}>
                <Typography variant="h6">Suggested Products</Typography>
                <Link
                  href={`/catalogsearch/result?q=${search}`}
                  onClick={goToSearchResults}
                >
                  View All ({products.length})
                </Link>
              </div>

              <div className={styles.product_items}>
                {products.slice(0, 3).map((product, ind) => (
                  <div className={styles.product_item}>
                    <Link
                      key={product.id}
                      href={{
                        pathname: `/${product.url_key + productUrlSuffix}`,
                        query: { type: "PRODUCT" },
                      }}
                      as={`/${product.url_key + productUrlSuffix}`}
                      onClick={handleClick}
                    >
                      <article className={styles.product_holder}>
                        <picture className={styles.product_image}>
                          <img
                            className={styles.productImage}
                            src={
                              resolveImage(product.thumbnail.url) +
                              "?width=150&height=170&webp=auto"
                            }
                            alt={product.thumbnail.label}
                            width={150}
                            height={170}
                            loading="lazy"
                          />
                        </picture>

                        <div className={styles.product_detail}>
                          <h3 className={styles.product_title}>
                            {product.name}
                          </h3>
                          <Price {...product.price_range} />
                        </div>
                      </article>
                    </Link>
                  </div>
                ))}
              </div>
            </main>
          </div>
        )}
      </>
    );
  }
};

export default SearchResults;
