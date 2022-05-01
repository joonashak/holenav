import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Dialog from "../common/Dialog";
import ControlledTextField from "../controls/ControlledTextField";
import FormGroupRow from "../controls/FormGroupRow";

const LocalLogin = () => {
  const { control } = useForm();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={toggleOpen}>
        Login with Holenav
      </Button>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>Login with Holenav Credentials</DialogTitle>
        <DialogContent>
          <form>
            <FormGroupRow fullWidth>
              <ControlledTextField name="username" label="Username" control={control} />
            </FormGroupRow>
            <FormGroupRow fullWidth>
              <ControlledTextField
                name="password"
                label="Password"
                control={control}
                type="password"
              />
            </FormGroupRow>
            <FormGroupRow fullWidth>
              <Button type="submit" variant="contained" color="secondary" data-cy="login" fullWidth>
                Login
              </Button>
            </FormGroupRow>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocalLogin;
