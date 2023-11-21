import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { CheckBox, ExpandMore, ExpandMoreOutlined } from "@mui/icons-material";
import FilterItem from "./FilterItem";
import { useState } from "react";

const FiltersList = ({ filter, handleChange, childToParent, isChecked }) => {
  const FilterOptions = filter?.options;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreOutlined />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{filter.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {FilterOptions.map((filteroption) => {
            return (
              <FilterItem
                filterlabel={filter.attribute_code}
                filteroption={filteroption}
                handleChange={handleChange}
                childToParent={childToParent}
                isChecked={isChecked}
              ></FilterItem>
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default FiltersList;
