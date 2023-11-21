import { Slider } from "@mui/material";
import React, { useCallback } from "react";

export const SideBar = ({ aggregations }) => {
  // console.log(aggregations);

  const priceOptions = aggregations[0].options;

  return (
    <div className="container">
      {aggregations.map((item) => {
        return (
          <>
            <span>{item.label}</span>
            <br />
          </>
        );
      })}
    </div>
  );
};
