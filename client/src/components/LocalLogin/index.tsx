import { useMutation } from "@apollo/client";
import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LoginDocument } from "../../generated/graphqlOperations";
import Dialog from "../common/Dialog";
import ControlledTextField from "../controls/ControlledTextField";
import FormGroupRow from "../controls/FormGroupRow";
import useLocalData from "../LocalData/useLocalData";

const LocalLogin = () => {
  const history = useHistory();
  const { setAuthToken } = useLocalData();
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  const [loginMutation] = useMutation(LoginDocument, {
    onCompleted: async ({ login }) => {
      await setAuthToken(login.accessToken);
      history.push("/system/J104809");
    },
  });

  const onSubmit = async () => {
    await loginMutation({ variables: { username: "mock-user-1", password: "mock-password-1" } });
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={toggleOpen}>
        Login with Holenav
      </Button>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>Login with Holenav Credentials</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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
