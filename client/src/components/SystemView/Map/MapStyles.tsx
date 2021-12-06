import { GlobalStyles } from "@mui/material";

/**
 * Map CSS styles.
 * This component should be hoisted to a static constant to avoid unnecessary rerendering.
 * See: https://mui.com/customization/how-to-customize/#5-global-css-override
 */
const MapStyles = () => (
  <GlobalStyles
    styles={(theme: any) => ({
      ".custom-link.custom-link": {
        stroke: theme.palette.secondary.light,
        strokeWidth: 10,
        strokeDasharray: "10,10",
      },
    })}
  />
);

export default MapStyles;
