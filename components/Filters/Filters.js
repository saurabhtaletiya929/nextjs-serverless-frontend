import React, { useMemo, useState } from "react";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { FiltersDesktop } from "./FiltersDesktop";
import styles from "./Filters.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  Typography,
  makeStyles,
} from "@mui/material";

const MAX_FILTERS = 7;

export const Filters = ({ aggregations, handleFilterClick }) => {
  const sortedFilters = aggregations.sort(function (a, b) {
    return a.attribute_code.localeCompare(b.attribute_code);
  });

  const { visibleFilters, moreFilters } = useMemo(() => {
    // const noOfFacets = isMobileView ? 5 : 7
    return {
      visibleFilters:
        sortedFilters.length <= MAX_FILTERS
          ? sortedFilters.slice(0, MAX_FILTERS)
          : sortedFilters.slice(0, MAX_FILTERS - 1),
      moreFilters:
        sortedFilters.length > MAX_FILTERS
          ? sortedFilters.slice(MAX_FILTERS - 1)
          : [],
    };
  }, [MAX_FILTERS, sortedFilters]);

  const [expanded, setExpended] = useState(null);
  const changeDropDownBehavior = (panel) => (event, isExpanded) => {
    console.log(panel);
    setExpended(isExpanded ? panel : null);
  };

  return (
    <div className={styles.filtersContainer}>
      {visibleFilters.map((filter, index) => {
        return (
          <FiltersDesktop
            filter={filter}
            dropDownClass="accordDesktopDetail"
            handleFilterClick={handleFilterClick}
            panel={`panel_${filter.label}`}
            expanded={expanded === `panel_${filter.label}`}
            onChange={changeDropDownBehavior(`panel_${filter.label}`)}
          ></FiltersDesktop>
        );
      })}

      <Accordion className={styles.moreFilters}>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>More Filters</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordDesktopDetail}>
          <FormGroup>
            {moreFilters.map((filter, index) => {
              return (
                <FiltersDesktop
                  filter={filter}
                  dropDownClass="accordMobDetail"
                  handleFilterClick={handleFilterClick}
                  panel={`panel_${filter.label}`}
                  expanded={expanded === `panel_${filter.label}`}
                  onChange={changeDropDownBehavior(`panel_${filter.label}`)}
                ></FiltersDesktop>
              );
            })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
