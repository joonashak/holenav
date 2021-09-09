import { Control } from "react-hook-form";
import ControlledTextField from "../../../../controls/ControlledTextField";

type SigFormProps = {
  control: Control<any, object>;
};

export default ({ control }: SigFormProps) => {
  console.log("asd");

  return (
    <>
      <ControlledTextField name="eveId" control={control} label="ID" />
      <ControlledTextField name="name" control={control} label="Name" />
    </>
  );
};
