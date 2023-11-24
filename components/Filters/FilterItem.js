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
      onChange={() => handleFilterClick({ ...filteroption, attribute_code: attributeCode })}
    />
  );
};
