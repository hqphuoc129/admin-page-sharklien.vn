import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      fullWidth
      onClose={() => setOpenPopup(false)}
    >
      <DialogTitle onClose={() => setOpenPopup(false)}>
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: "0",
            top: "0",
            padding: "5px 5px",
            margin: "0",
            color: "text",
            "&:hover": {
              color: "text",
            },
          }}
          onClick={() => setOpenPopup(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
