import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import FILTER_QUERY from "../Products/Products.graphql";
import { Filters } from "../Filters/Filters";
import { Container } from "@mui/material";

export const Aside = ({ aggregations, handleFilterClick }) => {
  return (
    <Container maxWidth="xl">
      <Filters
        aggregations={aggregations}
        handleFilterClick={handleFilterClick}
      ></Filters>
    </Container>
  );
};
