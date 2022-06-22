import { createTheme } from "@mui/material/styles";

let theme = createTheme();
theme = createTheme({
  palette: {
    primary: {
      main: "#2C3E50",
    },
    secondary: {
      main: "#19BC9C",
    },
    info: {
      main: "#4EA6FF",
    },
    background: {
      default: "#F5F7FA",
    },
  },
  typography: {
    fontFamily: "Work Sans",
    h1Light: {
      fontSize: "2rem", //original 2.5rem
      fontWeight: "300",
    },

    h2Bold: {
      fontSize: "1.2rem", //original 1.625rem
      fontFamily: "Work Sans",
      fontWeight: "700",
    },
    h2Light: {
      fontSize: "1.2rem", //original 1.625rem
      fontFamily: "Work Sans",
      fontWeight: "300",
    },

    h2Regular: {
      fontSize: "1.2rem", //original 1.625rem
      fontFamily: "Work Sans",
      fontWeight: "400",
    },

    h2SemiBold: {
      fontSize: "1.2rem", //original 1.625rem
      fontFamily: "Work Sans",
      fontWeight: "600",
    },

    h3Bold: {
      fontSize: "1rem", //original 1.6rem
      fontFamily: "Work Sans",
      fontWeight: "700",
    },

    h4Bold: {
      fontSize: "1rem", //original 1.2rem
      fontFamily: "Work Sans",
      fontWeight: "700",
    },

    h4SemiBold: {
      fontSize: "1rem", //original 1.2rem
      fontFamily: "Work Sans",
      fontWeight: "600",
    },

    h5SemiBold: {
      fontSize: "0.8rem", //Original 1 rem
      fontFamily: "Work Sans",
      fontWeight: "600",
      display: "block",
    },

    h5Regular: {
      fontSize: "0.8rem", //Original 1 rem
      fontFamily: "Work Sans",
      fontWeight: "400",
      display: "block",
    },

    h6Bold: {
      fontSize: "1rem", //Original 1.25 rem
      fontFamily: "Work Sans",
      fontWeight: "700",
      display: "block",
    },

    body1Regular: {
      fontSize: "0.64rem", //original 0.8 rem
      fontFamily: "Work Sans",
      fontWeight: "400",
      display: "block",
    },

    body2Regular: {
      fontSize: "0.72rem", //original 0.9rem
      fontFamily: "Work Sans",
      fontWeight: "400",
      display: "block",
    },

    body2SemiBold: {
      fontSize: "0.72rem", //original 0.9rem
      fontFamily: "Work Sans",
      fontWeight: "600",
      display: "block",
    },

    subtitle1Regular: {
      fontSize: "0.9rem", //original 1.125
      fontFamily: "Work Sans",
      fontWeight: "400",
      display: "block",
    },

    subtitle1Medium: {
      fontSize: "0.9rem", //original 1.125
      fontFamily: "Work Sans",
      fontWeight: "500",
      display: "block",
    },

    subtitle1SemiBold: {
      fontSize: "0.9rem", //original 1.125
      fontFamily: "Work Sans",
      fontWeight: "600",
      display: "block",
    },
    subtitle1Bold: {
      fontSize: "0.9rem", //original 1.125
      fontFamily: "Work Sans",
      fontWeight: "700",
      display: "block",
    },
    tiny: {
      fontSize: "0.5rem", //was 0.625 rem
      fontFamily: "Work Sans",
      fontWeight: "400",
    },
    small: {
      fontSize: "0.6rem", //was 0.75rem
      fontFamily: "Work Sans",
      fontWeight: "400",
    },
    large: {
      fontSize: "1.2rem", //was 2rem
      fontFamily: "Work Sans",
      fontWeight: "600",
    },
  },
  spacing: 6.4,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            borderColor: "#EAF0F6",
            fontSize: 14, //was 18
            paddingTop: theme.spacing(1.75), //original 2.75
            paddingBottom: theme.spacing(1.75), //original 2.75
            paddingRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            color: "#2C3E50",
            fontWeight: "bold",
          },
          "& input::placeholder": {
            fontSize: 14,
            fontWeight: "normal",
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
      styleOverrides: {
        root: {
          fontSize: "0.8rem", //was 1rem
          fontWeight: "400",
          color: "#5F7388",
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "card" },
          elevation: 3,
          style: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(3.25),
            paddingRight: theme.spacing(3.25),
            marginLeft: theme.spacing(3),
            borderRadius: 10,
            width: "90%",
            [theme.breakpoints.up("md")]: {
              width: "80%",
            },
          },
        },
        {
          props: { variant: "item" },
          elevation: 3,
          backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          ...theme.typography.body2,
          color: theme.palette.text.secondary,
          style: {
            position: "relative",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(3.25),
            paddingRight: theme.spacing(3.25),
            marginBottom: theme.spacing(2),
            borderRadius: 15,
            width: "90%",
            [theme.breakpoints.up("md")]: {
              width: "100%",
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "block", color: "secondary" },
          style: {
            width: "100%",
            height: 44, //was 55
            backgroundColor: "#19BC9C",
            color: "white",
            fontWeight: "600",
            fontSize: 14, //was 18
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#008b6e",
            },
          },
        },
        {
          props: { variant: "block", color: "primary" },
          style: {
            width: "100%",
            height: 44, //was 55
            backgroundColor: "#2C3E50",
            color: "white",
            fontSize: 14, //was 18
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#031828",
            },
          },
        },
        {
          props: { variant: "block", color: "cancel" },
          style: {
            width: "100%",
            height: 44, //was 55
            backgroundColor: "#FF4141",
            color: "#FFFFFF",
            fontSize: 14, //was 18
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FF4141",
            },
          },
        },
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#19BC9C",
            color: "white",
            fontWeight: "600",
            fontSize: 14, //was 18
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#008b6e",
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: "#F5F5F5",
            color: "#5F7388",
            fontWeight: "600",
            fontSize: 14, //was 18
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          },
        },
        {
          props: { variant: "contained", color: "warning" },
          style: {
            backgroundColor: "#F5F5F5",
            color: "red",
            fontWeight: "600",
            fontSize: 14,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            color: theme.palette.info.main,
            fontWeight: "600",
            fontSize: 14, //was 18
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#fff",
            },
          },
        },
        {
          props: { variant: "text", color: "secondary" },
          style: {
            color: "#5F7388",
            fontWeight: "600",
            fontSize: 12, //was 16
            textTransform: "none",
            "&:hover": {
              backgroundColor: "none",
            },
          },
        },
      ],
    },
  },
});

theme.typography.h1 = {
  fontSize: "2rem", //original 2.5rem
  fontWeight: "700",
};

theme.typography.h2 = {
  fontSize: "1.2rem", //original 1.625rem
  fontFamily: "Work Sans",
  fontWeight: "600",
};

theme.typography.h3 = {
  fontSize: "1rem", //original 1.6rem
  fontFamily: "Work Sans",
  fontWeight: "500",
};

theme.typography.h4 = {
  fontSize: "1rem", //original 1.2rem
  fontFamily: "Work Sans",
  fontWeight: "500",
};

theme.typography.h5 = {
  fontSize: "0.8rem", //Original 1 rem
  fontFamily: "Work Sans",
  fontWeight: "400",
};

theme.typography.h6 = {
  fontSize: "1rem", //Original 1.25 rem
  fontFamily: "Work Sans",
  fontWeight: "400",
};

theme.typography.body1 = {
  fontSize: "0.64rem", //original 0.8 rem
  fontFamily: "Work Sans",
  fontWeight: "300",
};

theme.typography.body2 = {
  fontSize: "0.72rem", //original 0.9rem
  fontFamily: "Work Sans",
  fontWeight: "300",
};

theme.typography.subtitle1 = {
  fontSize: "0.9rem", //original 1.125
  fontFamily: "Work Sans",
  fontWeight: "400",
};

theme.typography.subtitle2 = {
  fontSize: "0.7rem", //original 0.875rem
  fontFamily: "Work Sans",
  fontWeight: "400",
};

export default theme;
