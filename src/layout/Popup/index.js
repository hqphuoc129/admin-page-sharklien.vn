import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography
            variant="h2"
            component="div"
            style={{ flexGrow: 1, margin: "0px" }}
          >
            {title}
          </Typography>
          <Button
            color="secondary"
            onClick={() => {
              setOpenPopup(!openPopup);
            }}
          >
            X
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
