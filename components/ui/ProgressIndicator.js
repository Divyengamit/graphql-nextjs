import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export default function ProgressIndicator(props) {
  return (
    // <Box boxShadow={4} elevation={2}>
      <Dialog
        open={true}
        aria-describedby="alert-dialog-slide-description"
        sx={{ alignItems: "center", justifyContent: "center" }}
        className="loader-main-div"
      >
        <DialogContent sx={{ width: "6rem", height: "6rem" }}>
          <CircularProgress sx={{ ml: 1, mt: 0.5 }} />
        </DialogContent>
      </Dialog>
    // </Box>
  );
}
