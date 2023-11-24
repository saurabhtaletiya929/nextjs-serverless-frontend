import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  Typography,
} from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { FilterItem } from "./FilterItem";
import styles from "./Filters.module.css";

export const FiltersDesktop = ({
  filter,
  dropDownClass,
  handleFilterClick,
  panel,
  expanded,
  onChange,
}) => {
  const FilterOptions = filter?.options;

  return (
    <Accordion
      className={styles.accordDesktop}
      expanded={expanded}
      onChange={onChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreOutlined />}
        aria-controls={`${panel}bh-content`}
        id={`${panel}bh-header`}
      >
        <Typography>{filter.label}</Typography>
      </AccordionSummary>
      <AccordionDetails className={styles[`${dropDownClass}`]}>
        <FormGroup>
          {FilterOptions.map((filteroption) => {
            return (
              <FilterItem
                attributeCode={filter.attribute_code}
                filteroption={filteroption}
                handleFilterClick={handleFilterClick}
              ></FilterItem>
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
