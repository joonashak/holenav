import { Box, BoxProps } from "@mui/material";
import PageTitle from "../../common/PageTitle";

type SettingsGridProps = BoxProps & {
  title?: string;
};

const SettingsGrid = ({ title, children, ...boxProps }: SettingsGridProps) => (
  <Box {...boxProps}>
    {!!title && <PageTitle>{title}</PageTitle>}
    {children}
  </Box>
);

export default SettingsGrid;
