import React from "react";
import styles from "./Filters.module.css";
import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  Typography,
} from "@mui/material";
import { FilterItem } from "./FilterItem";

export const FilterMobileModal = ({ aggregations, handleChangeEvent }) => {
  return (
    <div className={styles.filterModalContainer}>
      <div>
        {aggregations.map((filter, index) => {
          return (
            <div>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                  <Typography>{filter.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {filter.options.map((filteroption) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
