import React, { useMemo, useState } from "react";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { FiltersDesktop } from "./FiltersDesktop";
import styles from "./Filters.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FilterMobile } from "./FilterMobile";

const filterClasses = makeStyles({
  summaryExpanded: {
    "& .MuiAccordionSummary-root": {
      minHeight: "auto !important",
      "&.Mui-expanded:after": {
        content: '""',
        height: "7px",
        width: "100%",
        background: "#fff",
        position: "absolute",
        left: "-1px",
        top: "100%",
        zIndex: "6",
        borderLeft: "1px solid #eee",
        borderRight: "1px solid #eee",
      },
    },
    "& .MuiAccordionSummary-content": { margin: "12px 0 !important" },
  },
  moreFilters: {
    marginTop: "0px !important",
    "& >div:nth-last-child(-n+3) .MuiAccordionDetails-root": {
      right: "0px",
      left: "auto",
    },
    "& .MuiCollapse-container .MuiAccordionSummary-content": {
      margin: "0px",
    },
    "& .MuiAccordion-root .MuiCollapse-container": {
      left: "auto",
      right: "0",
      border: "0",
    },
    "& #facet-desktop-reviews .MuiCollapse-container": {
      width: "100%!important",
    },
    "& .MuiCollapse-container .MuiCollapse-container": {
      position: "relative",
      margin: "0",
      width: "100%",
      left: "0!important",
      right: "0!important",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0",
      display: "block",
    },
    "& .MuiAccordionDetails-root .MuiAccordionDetails-root": {
      padding: "10px",
    },
    "& .MuiAccordion-root .MuiCollapse-wrapper .MuiFormGroup-root": {
      gridTemplateColumns: "1fr",
      gridGap: "0",
    },
  },
});

export const Filters = ({ aggregations, handleChangeEvent }) => {
  const theme = useTheme();
  const classes = filterClasses();

  const isTabletView = useMediaQuery(
    theme.breakpoints.up("768") && theme.breakpoints.down("1200")
  );
  const isMobileView = useMediaQuery(theme.breakpoints.down("768"));

  // const sortedFilters = aggregations.sort(function (a, b) {
  //   return a.attribute_code.localeCompare(b.attribute_code);
  // });

  const { visibleFilters, moreFilters } = useMemo(() => {
    const noOfFilters = isTabletView ? 5 : 7;
    return {
      visibleFilters:
        aggregations.length <= noOfFilters
          ? aggregations.slice(0, noOfFilters)
          : aggregations.slice(0, noOfFilters - 1),
      moreFilters:
        aggregations.length > noOfFilters
          ? aggregations.slice(noOfFilters - 1)
          : [],
    };
  }, [isTabletView, aggregations]);

  const [expanded, setExpended] = useState(null);
  const changeDropDownBehavior = (panel) => (event, isExpanded) => {
    setExpended(isExpanded ? panel : null);
  };

  return (
    <>
      <Box>
        {isMobileView ? (
          <FilterMobile
            aggregations={aggregations}
            handleChangeEvent={handleChangeEvent}
          ></FilterMobile>
        ) : (
          <div className={styles.filtersContainer}>
            {visibleFilters.map((filter, index) => {
              return (
                <FiltersDesktop
                  filter={filter}
                  dropDownClass="accordDesktopDetail"
                  handleChangeEvent={handleChangeEvent}
                  panel={`panel_${filter.label}`}
                  expanded={expanded === `panel_${filter.label}`}
                  onChange={changeDropDownBehavior(`panel_${filter.label}`)}
                  classes={classes}
                ></FiltersDesktop>
              );
            })}

            <Accordion
              className={`${classes.moreFilters} ${classes?.summaryExpanded}`}
            >
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
                        handleChangeEvent={handleChangeEvent}
                        panel={`panel_${filter.label}`}
                        expanded={expanded === `panel_${filter.label}`}
                        onChange={changeDropDownBehavior(
                          `panel_${filter.label}`
                        )}
                        classes={classes}
                      ></FiltersDesktop>
                    );
                  })}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </Box>
    </>
  );
};
