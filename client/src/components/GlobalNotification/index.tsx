/**
 * This component renders a single, global notification in accordance with Material Design rules.
 * To trigger the notification, use the custom hook `useNotification`.
 */
import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

import useNotification from "./useNotification";

export default () => {
  const [open, setOpen] = useState(false);
  const { type, message, autoHide, resetNotification } = useNotification();

  const severity = type || "info";
  const autoHideDuration = autoHide ? 5000 : null;

  const close = () => setOpen(false);
  const reset = () => resetNotification();

  useEffect(() => {
    if (type) {
      setOpen(true);
    }
  }, [type]);

  return (
    <Snackbar
      open={open}
      onClose={close}
      TransitionProps={{ onExited: reset }}
      autoHideDuration={autoHideDuration}
    >
      <Alert severity={severity} variant="filled" onClose={close}>
        {message}
      </Alert>
    </Snackbar>
  );
};
