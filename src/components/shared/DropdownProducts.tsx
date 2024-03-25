import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { useGetProducts } from "@/hooks/client/products";
import { Product } from "@/client/models/products";

const DropdownProducts: React.FC<{
  onChange: (product: Product | null) => void;
}> = ({ onChange }) => {
  const { isLoading, data } = useGetProducts({});

  return (
    <Autocomplete
      fullWidth
      disabled={isLoading}
      disablePortal
      size="small"
      id="combo-box-demo"
      options={data?.data || []}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} label="Products" />}
      onChange={(
        event: any,
        newValue: Product | null,
        reason: AutocompleteChangeReason
      ) => {
        if (reason === "clear") {
          onChange(null);
        } else if (newValue) {
          onChange(newValue);
        }
      }}
    />
  );
};

export default DropdownProducts;
