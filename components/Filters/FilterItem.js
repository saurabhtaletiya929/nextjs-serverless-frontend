import { FormControlLabel, Checkbox } from "@mui/material";

export const FilterItem = ({
  filteroption,
  filterlabel,
  handleChangeEvent,
}) => {
  return (
    <FormControlLabel
      control={<Checkbox name={filteroption.value}></Checkbox>}
      label={filteroption.label}
      onChange={(e) => {
        handleChangeEvent(filterlabel, e.target.name);
      }}
    />
  );
};
