import React, { useCallback } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useSelector } from "react-redux";
const successIcon = require("../../assets/success.png");
const downloadIcon = require("../../assets/icons/download_icon.png");
const printIcon = require("../../assets/icons/cil_print.png");

const Transactions = () => {
  const userData = useSelector(({ dashboard }) => dashboard?.data);
  const tableData = userData?.transactions;
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Transactions Records");
  sheet.properties.defaultRowHeight = 80;
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
    {
      header: "Amount",
      key: "amount",
      width: 16,
    },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    position: "relative",
    padding: theme.spacing(3.25),
    marginBottom: theme.spacing(2),
    borderRadius: "15px",
    color: theme.palette.text.secondary,
  }));

  const tableStyles = {
    ".MuiDataGrid-columnHeaderTitle": {
      fontSize: "1rem",
    },
    ".MuiDataGrid-cell": {
      color: "primary.main",
      fontSize: "1rem",
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
    border: 0,
  };

  const columns = [
    { field: "createdOn", headerName: "Date", flex: 1, sortable: true },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {/* <img
            src={successIcon}
            style={{ width: 31, height: 31, marginRight: "11px" }}
          /> */}
          <Image src={successIcon} height={31} width={31} alt="image" />
          {params.value}
        </Box>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      headerAlign: "right",
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="flex-end" sx={{ flex: 1 }}>
          <Typography variant="h2Light" sx={{ color: "#19BC9C" }}>
            ₹ {params.value}
          </Typography>
        </Box>
      ),
    },
  ];

  const handlePrintClick = useCallback(() => {
    window.print();
  });

  const handleDownloadClick = useCallback(async () => {
    for (let i = 0; i < tableData?.length; i++) {
      const transactionData = tableData[i];
      sheet.addRow({
        createdOn: transactionData?.createdOn,
        description: transactionData?.description,
        amount: transactionData?.amount,
      });
    }
    const data = await workbook.xlsx.writeBuffer().then(function (data) {
      var blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "statement.xlsx");
    });
  });

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
                  Recent Transactions
                </Typography>

                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="download">
                    {/* <img
                      src={downloadIcon}
                      style={{ width: 25, height: 25 }}
                      onClick={handleDownloadClick}
                    /> */}
                    <Image
                      src={downloadIcon}
                      height={25}
                      width={25}
                      alt="image"
                    />
                  </IconButton>
                  <IconButton
                    aria-label="print"
                    color="primary"
                    onClick={handlePrintClick}
                  >
                    {/* <img src={printIcon} style={{ width: 26, height: 26 }} /> */}
                    <Image src={printIcon} height={26} width={26} alt="image" />
                  </IconButton>
                </Stack>
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
                        No Transactions
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

export default Transactions;
