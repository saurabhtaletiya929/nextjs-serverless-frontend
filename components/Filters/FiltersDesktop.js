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
  handleChangeEvent,
  panel,
  expanded,
  onChange,
  classes,
}) => {
  const FilterOptions = filter?.options;
  console.log(classes);

  return (
    <Accordion
      className={`${styles.accordDesktop} ${classes.summaryExpanded}`}
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
                filterlabel={filter.attribute_code}
                filteroption={filteroption}
                handleChangeEvent={handleChangeEvent}
              ></FilterItem>
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
