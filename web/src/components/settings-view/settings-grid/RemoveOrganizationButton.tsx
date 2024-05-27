import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, IconButtonProps } from "@mui/material";
import useAppSettings from "../app-settings/useAppSettings";

type RemoveOrganizationButtonProps = IconButtonProps & {
  alliance: boolean;
  esiId: string;
};

const RemoveOrganizationButton = ({
  alliance,
  esiId,
  ...iconButtonProps
}: RemoveOrganizationButtonProps) => {
  const { removeAllowedAlliance, removeAllowedCorporation } = useAppSettings();

  const onClick = () => {
    if (alliance) {
      removeAllowedAlliance(esiId);
    } else {
      removeAllowedCorporation(esiId);
    }
  };

  return (
    <IconButton
      {...iconButtonProps}
      edge="end"
      aria-label="delete"
      onClick={onClick}
      sx={{ color: "primary.dark", "&:hover": { color: "warning.light" } }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default RemoveOrganizationButton;
