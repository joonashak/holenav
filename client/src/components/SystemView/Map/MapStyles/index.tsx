import { GlobalStyles } from "@mui/material";
import MapLinkClasses from "./MapLinkClasses.enum";

/**
 * Create CSS class specifier with high specificity to easily override react-d3-tree default
 * styles.
 */
const specificClassName = (className: string) => `.${className}.${className}`;

/**
 * Map tree CSS styles.
 * This component should be hoisted to a static constant to avoid unnecessary rerendering.
 * See: https://mui.com/customization/how-to-customize/#5-global-css-override
 */
const MapStyles = () => (
  <GlobalStyles
    styles={(theme: any) => ({
      [specificClassName(MapLinkClasses.DEFAULT)]: {
        stroke: theme.palette.secondary.light,
        strokeWidth: 10,
      },
      [specificClassName(MapLinkClasses.EOL)]: {
        strokeDasharray: "10,10",
      },
      [specificClassName(MapLinkClasses.DESTAB)]: {
        stroke: theme.palette.warning.light,
      },
      [specificClassName(MapLinkClasses.CRIT)]: {
        stroke: theme.palette.error.light,
      },
    })}
  />
);

export default MapStyles;
