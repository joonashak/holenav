import { Dialog as MuiDialog, DialogProps } from "@mui/material";

/**
 * Responsive dialog wrapper. Use for overlaying content that requires focus and
 * action. Uses MUI Dialog.
 */
const Dialog = ({ children, ...props }: DialogProps) => (
  <MuiDialog
    {...props}
    PaperProps={{
      sx: {
        width: "100vw",
        ml: { xs: 0 },
        mr: { xs: 0 },
      },
    }}
  >
    {children}
  </MuiDialog>
);

export default Dialog;
