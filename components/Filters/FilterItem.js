import { FormControlLabel, Checkbox } from "@mui/material";

export const FilterItem = ({
  attributeCode,
  filteroption,
  handleFilterClick,
}) => {
  return (
    <FormControlLabel
      control={<Checkbox name={filteroption.value}></Checkbox>}
      label={filteroption.label}
      onClick={() => handleFilterClick({ ...filteroption, attribute_code: attributeCode })}
    />
  );
};
