import React from "react";

import { MenuItem, Typography } from "@mui/material";

const OptionsTypesText = (props) => {
  const listOptions = props?.map((item) => {
    return (
      <MenuItem
        key={item?.value}
        value={item?.value}
        sx={{ pt: 2, pb: 2, pl: 4 }}
      >
        <Typography variant="h5SemiBold" color="primary">
          {item?.text}
        </Typography>
      </MenuItem>
    );
  });

  return listOptions;
};

export default OptionsTypesText;
