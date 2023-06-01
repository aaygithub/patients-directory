import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Alert, AlertTitle } from "@mui/material";
import { IPatient } from "../../common/interfaces";
import React from "react";

export interface DeletePatientModalProps {
  onCancel: (action?: number) => void;
  onConfirm: (patientData: IPatient) => void;
  patientData: IPatient;
}

export const DeletePatientModal: React.FC<DeletePatientModalProps> = ({
  onCancel,
  onConfirm,
  patientData,
}) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onConfirm(patientData);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={true}
      data-testid="delete-modal-wrapper"
    >
      <DialogTitle>Delete Patient Details Confirmation</DialogTitle>
      <DialogContent dividers>
        <Alert severity="warning">
          <AlertTitle>Are you sure, you want delete details of?</AlertTitle>
          <strong>
            {patientData.first_name} {patientData.last_name}
          </strong>{" "}
          <div data-testid="delete-modal-email-id-message">{`(email id: ${patientData.email})`}</div>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};
