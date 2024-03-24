import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { useGetProductsCategories } from "@/hooks/client/products";

const DropdownCategories: React.FC<{
  onChange: (category: string) => void;
}> = ({ onChange }) => {
  const { isLoading, data } = useGetProductsCategories();

  return (
    <Autocomplete
      disabled={isLoading}
      disablePortal
      size="small"
      id="combo-box-demo"
      options={data?.data || []}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categories" />}
      onChange={(
        event: any,
        newValue: string | null,
        reason: AutocompleteChangeReason
      ) => {
        if (reason === "clear") {
          onChange("");
        } else if (newValue) {
          onChange(newValue);
        }
      }}
    />
  );
};

export default DropdownCategories;
