import { FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";

const FacetItem = ({
  filterlabel,
  filteroption,
  handleChange,
  childToParent,
  isChecked,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  return (
    <FormControlLabel
      control={
        <Checkbox
          name={filteroption.value}
          checked={isChecked}
          onChange={() => {
            handleChange(filteroption.value);
            childToParent(filterlabel);
          }}
        ></Checkbox>
      }
      label={filteroption.label}
    />
  );
};

export default FacetItem;
