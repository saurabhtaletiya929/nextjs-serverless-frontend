import React, { useState } from "react";
import { TuneOutlined } from "@mui/icons-material";
import { FilterMobileModal } from "./FilterMobileModal";
import { Button } from "@mui/material";

export const FilterMobile = ({ aggregations, handleChangeEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleShowFilters = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <Button size="small" onClick={toggleShowFilters}>
        <span>Filter List</span>
        <TuneOutlined />
      </Button>
      {showModal && <FilterMobileModal aggregations={aggregations} />}
    </>
  );
};
