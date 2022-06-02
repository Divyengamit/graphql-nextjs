import React, { useState } from "react";

import {
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Checkbox,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import BreadCrumb from "../components/ui/BreadCrumb";
import InputField from "../components/ui/InputField";
import OptionsTypes from "../components/onboarding/OptionsTypes";

import { useForm, FormProvider } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Questions1, Questions2 } from "../data/securityQuestions";
import stateList from "../data/states";
const WarnIcon = require("../assets/warning.png");

const MyProfileScreen = () => {
  const [open, setOpen] = React.useState(false);

  const methods = useForm({
    resolver: "",
    mode: "onSubmit",
    defaultValues: {
      state: "Telangana",
      question1: Questions1[1]?.value,
      question2: Questions2[0]?.value,
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = (values) => {
    console.log("submitted");
  };

  return (
    <Container maxWidth="100%">
      <BreadCrumb items={["Account", "Profile"]} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper variant="card" sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleClickOpen}>
              Change password
            </Button>
            <Button variant="outlined" onClick={handleClickOpen}>
              Change adddress
            </Button>
            {/* <Dialog open={open} onClose={handleClose}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogTitle variant="h3Bold" color="secondary">
                Change Your Password
              </DialogTitle>
              <DialogContent>
                <Typography variant="h5SemiBold" sx={{ mt: 3 }}>
                  Confirm your current password *
                </Typography>
                <TextField
                  type="password"
                  name="password"
                  variant="outlined"
                  placeholder="Current Password"
                  fullWidth
                  sx={{ mt: 1.2 }}
                />
                <DialogContentText sx={{ mt: 1, ml: 1 }}>
                  Enter your new password (Keep account more secure. Don’t use
                  your name.)
                </DialogContentText>
                <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                  Your New password *
                </Typography>
                <TextField
                  type="password"
                  name="password"
                  variant="outlined"
                  placeholder="New Password"
                  fullWidth
                  sx={{ mt: 1.2 }}
                />
                <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                  Confirm New password *
                </Typography>
                <TextField
                  type="password"
                  name="password"
                  variant="outlined"
                  placeholder="Confirm Password"
                  fullWidth
                  sx={{ mt: 1.2 }}
                />
                <Button variant="block" color="secondary" sx={{ mt: 2, mb: 3 }}>
                  Change Password
                </Button>
              </DialogContent>
            </Dialog> */}

            {/* Change Address */}

            {/* <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={true}
              maxWidth={"sm"}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogTitle variant="h3Bold" color="secondary">
                Add a new address
              </DialogTitle>
              <DialogContent>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                    <Typography variant="h5SemiBold" sx={{ mt: 3 }}>
                      Address line 1 *
                    </Typography>
                    <InputField
                      type="text"
                      name="address1"
                      placeholder="Your house name/no"
                      settings={{
                        variant: "outlined",
                        sx: { mt: 1.2 },
                        fullWidth: true,
                      }}
                    />
                    <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                      Address line 2
                    </Typography>
                    <InputField
                      type="text"
                      name="address2"
                      placeholder="Your locality/Area"
                      settings={{
                        variant: "outlined",
                        sx: { mt: 1.2 },
                        fullWidth: true,
                      }}
                    />
                    <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                      Town / City
                    </Typography>
                    <InputField
                      type="text"
                      name="city"
                      placeholder="Your City/Town"
                      settings={{
                        variant: "outlined",
                        sx: { mt: 1.2 },
                        fullWidth: true,
                      }}
                    />
                    <Typography variant="h5SemiBold" sx={{ mt: 1.2 }}>
                      State *
                    </Typography>
                    <InputField
                      name="state"
                      settings={{
                        select: true,
                        fullWidth: true,
                        sx: {
                          mt: 1.2,
                          ".MuiInputBase-input": {
                            paddingLeft: 4,
                            paddingTop: 3,
                            paddingBottom: 3,
                          },
                        },
                      }}
                    >
                      {OptionsTypes(stateList)}
                    </InputField>
                    <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                      PinCode
                    </Typography>
                    <InputField
                      type="number"
                      name="pincode"
                      placeholder="eg , 385427"
                      settings={{
                        variant: "outlined",
                        sx: { mt: 1.2 },
                        fullWidth: true,
                      }}
                    />
                    <DialogContentText sx={{ mt: 1, ml: 1 }}>
                      Enter your new password (Keep account more secure. Don’t
                      use your name.)
                    </DialogContentText>

                    <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                      <Checkbox /> Make this your primary address
                    </Typography>

                    <Button
                      variant="block"
                      color="secondary"
                      sx={{ mt: 2, mb: 3 }}
                    >
                      <AddIcon /> Add Address
                    </Button>
                  </form>
                </FormProvider>
              </DialogContent>
            </Dialog> */}

            {/* "All address Model" */}

            {/* <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={true}
              maxWidth={"sm"}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogTitle
                variant="h3Bold"
                color="secondary"
                sx={{ mt: 1.1, mb: 1.1 }}
              >
                All Address
              </DialogTitle>

              <DialogContent>
                <DialogContentText>
                  Add a new address, make quick edits, or remove an old address
                  Add a new address,
                </DialogContentText>
                <Button variant="text" color="secondary" sx={{ mt: 1, mb: 1 }}>
                  Add New <AddIcon />
                </Button>

                <div
                  style={{
                    paddingBottom: "26px",
                    paddingTop: "22px",
                    borderTop: "0.5px solid ",
                    borderBottom: "0.5px solid ",
                    borderColor: "#EAF0F6",
                  }}
                >
                  <Chip label="Primary" sx={{ mb: 1, borderRadius: 1 }} />

                  <Typography
                    variant="h5"
                    sx={{ lineHeight: 1.5 }}
                    color="#000000"
                  >
                    403, 11th Cross 18th Man 2nd Phase JP nagar,
                    <br /> Bangalore, <br /> Karnataka - 560078
                  </Typography>

                  <div
                    style={{
                      background: "#F5F5F5",
                      paddingTop: 10,
                      padding: 10,
                      marginTop: 10,
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CreditCardIcon sx={{ alignSelf: "center", mr: 1 }} />{" "}
                    You’re using this address for 1 card
                  </div>

                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    sx={{ mr: 0.6 }}
                  >
                    Edit &nbsp;
                    <EditIcon fontSize="small" />
                  </Button>
                  <Button
                    disableElevation
                    style={{
                      backgroundColor: "#F5F5F5",
                      color: "red",
                      boxShadow: "none",
                      textTransform: "capitalize",
                    }}
                    variant="contained"
                  >
                    Remove &nbsp;
                    <RemoveIcon fontSize="small" />
                  </Button>
                </div>

                <div>
                  <Chip
                    label="Secondary"
                    sx={{ mt: 2, mb: 1, borderRadius: 1 }}
                  />

                  <Typography
                    variant="h5"
                    sx={{  lineHeight: 1.5, mb: 0.9 }}
                    color="#000000"
                  >
                    403, 11th Cross 18th Man 2nd Phase JP nagar,
                    <br /> Bangalore, <br /> Karnataka - 560078
                  </Typography>

                  <Button
                    disableElevation
                    sx={{ mr: 0.6 }}
                    variant="contained"
                    color="primary"
                  >
                    Set as Primary
                  </Button>

                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    sx={{ mr: 0.6 }}
                  >
                    Edit &nbsp;
                    <EditIcon fontSize="small" />
                  </Button>
                  <Button variant="contained" color="warning" disableElevation>
                    Remove &nbsp;
                    <RemoveIcon fontSize="small" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog> */}

            {/* REMOVE ADDRESS MODAL */}

            {/* <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={true}
              maxWidth={"sm"}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 22,
                }}
              >
                <CloseIcon />
              </IconButton>

              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: 22,
                }}
              >
                <ArrowBackIcon />
              </IconButton>

              <DialogTitle
                variant="h3Bold"
                color="secondary"
                sx={{ mt: 1.1, alignSelf: "center" }}
              >
                Remove this Address
              </DialogTitle>

              <DialogContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "#F5F7FA",
                    padding: "22px 37px 33px 37px",
                    marginTop: "44px",
                    marginBottom: "32px",
                  }}
                  sx={{
                    mb: 2,
                  }}
                >
                  <img
                    src={WarnIcon}
                    style={{ width: "87px", height: "76px" }}
                  />

                  <Typography
                  variant="h2Bold"
                    sx={{
                      color: "#5F7388",
                      lineHeight: "40px",
                      mt: 0.6,
                    }}
                  >
                    Are you sure to remove this address ?
                  </Typography>

                  <Typography
                  variant="h5"
                    sx={{
                      color: "#000000",
                      textAlign: "center",
                      mt: 0.8,
                      lineHeight: "24.5px",
                    }}
                  >
                    403, 11th Cross 18th Man 2nd Phase JP nagar,
                    <br /> Bangalore, <br /> Karnataka - 560078
                  </Typography>
                </div>
                <Button variant="block" color="cancel">
                  Remove
                </Button>
              </DialogContent>
            </Dialog> */}

            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={true}
              maxWidth={"sm"}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 22,
                }}
              >
                <CloseIcon />
              </IconButton>

              <DialogTitle variant="h3Bold" color="secondary" sx={{ mt: 1.1 }}>
                Security Questions
              </DialogTitle>

              <DialogContent>
                <DialogContentText sx={{ mt: 1, ml: 1 }}>
                  We’ll use these questions as a way to make sure it’s your
                  account, like if you need to reset your password.
                </DialogContentText>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                    <Typography variant="h5SemiBold" sx={{ mt: 1.2 }}>
                      Security question 1
                    </Typography>
                    <InputField
                      name="question1"
                      placeholder="Select a Question"
                      settings={{
                        select: true,
                        fullWidth: true,
                        sx: {
                          mt: 1.2,
                          ".MuiInputBase-input": {
                            paddingLeft: 4,
                            paddingTop: 3,
                            paddingBottom: 3,
                          },
                        },
                      }}
                    >
                      {OptionsTypes(Questions1)}
                    </InputField>

                    <InputField
                      type="text"
                      name="question1_answer"
                      placeholder="Type your answer here"
                      settings={{
                        variant: "outlined",
                        sx: { mt: 1.2 },
                        fullWidth: true,
                      }}
                    />

                    <Typography variant="h5SemiBold" sx={{ mt: 1.2 }}>
                      Security question 2
                    </Typography>
                    <InputField
                      name="question2"
                      placeholder="Select a Question"
                      settings={{
                        select: true,
                        fullWidth: true,
                        sx: {
                          mt: 1.2,
                          ".MuiInputBase-input": {
                            paddingLeft: 4,
                            paddingTop: 3,
                            paddingBottom: 3,
                          },
                        },
                      }}
                    >
                      {OptionsTypes(Questions2)}
                    </InputField>

                    <InputField
                      type="text"
                      name="question2_answer"
                      placeholder="Type your answer here"
                      settings={{
                        variant: "outlined",
                        sx: { mt: 1.2 },
                        fullWidth: true,
                      }}
                    />
                    <Button
                      disableElevation
                      sx={{
                        fontSize: "1.125rem",
                        pt: 0.9,
                        pr: 2,
                        pl: 2,
                        mt: 1.2,
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </form>
                </FormProvider>
              </DialogContent>
            </Dialog>
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
};

export default MyProfileScreen;
