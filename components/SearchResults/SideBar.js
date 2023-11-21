import React, { useCallback, useState } from "react";
import FiltersList from "./FiltersList";
import styles from "./SearchResults.module.css";

export const SideBar = ({
  aggregations,
  handleChange,
  childToParent,
  isChecked,
}) => {
  const MAX_FILTERS = 6;

  const priceOptions = aggregations[0].options;
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className={styles.filtersContainer}>
      {aggregations.map((filter, index) => {
        const shouldShowItem = index < MAX_FILTERS;

        return (
          shouldShowItem && (
            <FiltersList
              filter={filter}
              handleChange={handleChange}
              childToParent={childToParent}
              isChecked={isChecked}
            ></FiltersList>
          )
        );
      })}
    </div>
  );
};
