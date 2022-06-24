/* eslint-disable react/no-unescaped-entities */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PrivacyDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <h2 className="modal-title-text">Privacy Policy</h2>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="contains-div">
            <p>
              In connection with submission of the application for my credit
              information offered by Equifax Credit Information Services Private
              Limited ("Equifax") through Canopi India Private Limited
              ("Canopi") and delivery of the Credit Information Report (CIR) to
              Canopi, I hereby acknowledge and agree to the following:
            </p>
            <p>
              <b>A.</b> I hereby authorize Canopi to receive my credit
              information from Equifax. I hereby unconditionally consent to and
              instruct the bureau to provide my credit information to Canopi.
            </p>
            <p>
              <b>B.</b> I authorize Canopi to do all acts on my behalf, as may
              be necessary including to execute/sign application(s), make
              payment of applicable fees* and generally to all other acts as may
              be necessary to receive, on my behalf and at my request, my Credit
              Information Report (CIR) from Equifax
            </p>
            <p>
              <b>C.</b> Further I authorize Canopi or any person/entity/third
              party appointed by Canopi to directly contact me on my shared
              email id and mobile number, for all matters pertaining to the
              lending products/loan requirements or any other ancillary
              requirements
            </p>
            <p>
              <b>D.</b> I hereby confirm, agree, undertake and accept that I
              shall at all times be solely responsible for all the above actions
              and omissions of Canopi and shall be binding on me as though such
              actions had been carried out by me directly. I further confirm
              that my CIR shall be used only for the purpose as mentioned in the
              attached standard terms and conditions and I shall be solely
              liable for, and indemnify and hold Equifax harmless for and
              against, any and all third party claims or damages or proceedings
              of any kind, arising from or in connection with (a) any
              misrepresentations, incorrect information or omission of any
              critical information in my application, or (b) furnishing my CIR
              based on this authorization letter, and shall not at any time hold
              Equifax or its affiliates and their respective officers,
              directors, employees or representatives liable in this respect.
            </p>
            <p>
              <b>F.</b> By submitting this registration form, I understand that
              I am providing express written instructions for Canopi to request
              and receive information about me from third parties, including but
              not limited to a copy of my consumer credit report and score from
              consumer reporting agencies for a period of 6 (six) months from
              the date of accepting this agreement.
            </p>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
