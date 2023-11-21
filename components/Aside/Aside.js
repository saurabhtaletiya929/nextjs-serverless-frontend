import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import FILTER_QUERY from "../Products/Products.graphql";
import { Filters } from "../Filters/Filters";
import { Container } from "@mui/material";

export const Aside = ({ filters, handleChangeEvent }) => {
  const { loading, data } = useQuery(FILTER_QUERY, {
    variables: { filters },
    notifyOnNetworkStatusChange: true,
  });

  const aggregations = data?.products.aggregations || [];

  return (
    <Container maxWidth="xl">
      <Filters
        aggregations={aggregations}
        handleChangeEvent={handleChangeEvent}
      ></Filters>
    </Container>
  );
};
