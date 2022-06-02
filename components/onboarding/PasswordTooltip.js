import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";

import InfoIcon from "../ui/InfoIcon";

const PasswordTooltip = () => {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      border: "1px solid #EAF0F6",
      fontSize: 11,
      maxWidth: "none",
      marginLeft: theme.spacing(500),
    },
    [`& .${tooltipClasses.arrow}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.white,
      "&:before": {
        border: "1px solid #EAF0F6",
      },
    },
  }));

  const rules = [
    "at least 8 characters long",
    "include 1 uppercase",
    "include 1 lowercase alpha character",
    "include 1 number and ",
    "include  special character",
  ];

  const PasswordHint = () => {
    return (
      <Box sx={{ pl: 1, pr: 1, pt: 2, pb: 2 }}>
        <Typography variant="body2Regular">Password should be</Typography>
        {rules.map((r) => (
          <ListItem sx={{ pl: 1, pt: 0, pb: 0 }}>
            <ListItemIcon sx={{ minWidth: 16 }}>
              <CircleIcon sx={{ width: 8, height: 8 }} color="#000" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2Regular">{r}</Typography>
            </ListItemText>
          </ListItem>
        ))}
        <Typography variant="body2Regular">
          Passwords are case sensitive
        </Typography>
      </Box>
    );
  };

  return (
    <LightTooltip title={<PasswordHint />} arrow placement="right">
      <IconButton sx={{ p: 0, mt: 0.5 }}>
        <InfoIcon />
      </IconButton>
    </LightTooltip>
  );
};

export default PasswordTooltip;
