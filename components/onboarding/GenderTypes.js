import React from "react";

import {
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@mui/material";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const GenderTypes = () => {
  return [
    <MenuItem key="male" value="male">
      <ListItem>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <MaleIcon fontSize="large" color="primary" />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="h5SemiBold" color="primary" sx={{ pl: 2 }}>
              MALE
            </Typography>
          }
        />
      </ListItem>
    </MenuItem>,
    <MenuItem key="female" value="female">
      <ListItem>
        <ListItemIcon sx={{ minWidth: 0 }}>
          <FemaleIcon fontSize="large" color="primary" />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="h5SemiBold" color="primary" sx={{ pl: 2 }}>
              FEMALE
            </Typography>
          }
        />
      </ListItem>
    </MenuItem>,
  ];
};

export default GenderTypes;
