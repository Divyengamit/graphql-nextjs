import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Typography, Paper, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import theme from "../../styles/theme";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router";

const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "500",
}));

const BreadCrumb = (props) => {
  const [items, setItems] = useState();
  const [lastItem, setLastItem] = useState();
  const router = useRouter();
  // const navigate = useNavigate();

  useEffect(() => {
    const items = [...props?.items];
    const lastItem = items?.pop();
    setItems(items);
    setLastItem(lastItem);
  }, [props.items]);

  const handleRoute = () => {
    router.push(-1);
  };

  return (
    <Paper
      variant="card"
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {!props?.goBack && (
        <IconButton
          aria-label="close"
          onClick={handleRoute}
          sx={{ mr: 2, p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      {items?.map((item) => (
        <>
          <StyledText variant="subtitle1">{item}</StyledText>
          <ChevronRightOutlinedIcon sx={{ mr: 0.2 }} />
        </>
      ))}
      <StyledText
        variant="subtitle1"
        sx={{ color: theme.palette.secondary.main }}
      >
        {lastItem}
      </StyledText>
    </Paper>
  );
};

export default BreadCrumb;
