import {
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import ExcelJS from "exceljs";
import { useSelector } from "react-redux";

const Activity = () => {
  const userData = useSelector(({ dashboard }) => dashboard?.data);
  const tableData = userData?.readNotifications || [];
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Activity Records");
  sheet.properties.defaultRowHeight = 10;
  // sheet.properties.defaultRowWidth = 5;
  sheet.columns = [
    {
      header: "Date",
      key: "createdOn",
      width: 16,
    },
    {
      header: "Description",
      key: "description",
      width: 16,
    },
  ];
  const columns = [
    {
      field: "createdOn",
      headerName: "Date",
      flex: 1,
      sortable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      sortable: false,
    },
  ];
  const tableStyles = {
    ".MuiDataGrid-columnHeaderTitle": {
      fontSize: "1rem",
    },
    ".MuiDataGrid-cell": {
      color: "primary.main",
      fontSize: "1rem",
      whiteSpace: "normal !important",
    },
    ".MuiDataGrid-row": {
      display: "flex",
      alignItems: "center",
    },
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    ".MuiDataGrid-columnSeparator": {
      visibility: "hidden",
    },

    // .css-1phi3zt-MuiDataGrid-root .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell
    border: 0,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    position: "relative",
    padding: theme.spacing(3.25),
    marginBottom: theme.spacing(2),
    borderRadius: "15px",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid item xs={12} md={12}>
            <Item>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Typography color="secondary" variant="h6Bold">
                  Recent Activity
                </Typography>
                <Stack direction="row" spacing={1}></Stack>
              </Box>
              <Divider />
              <Box sx={{ height: 509, width: "100%" }}>
                <DataGrid
                  rows={tableData}
                  columns={columns}
                  hideFooter
                  density="comfortable"
                  checkboxSelection
                  sx={tableStyles}
                  components={{
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No Activity
                      </Stack>
                    ),
                  }}
                />
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Activity;
