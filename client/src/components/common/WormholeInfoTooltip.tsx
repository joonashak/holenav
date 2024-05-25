import { ReactElement } from "react";
import { getWormholeProperties } from "../../utils/wormholeUtils";
import GridTooltip from "./GridToolTip";

type WormholeInfoTooltipProps = {
  children: ReactElement;
  type: string;
};

const WormholeInfoTooltip = ({ children, type }: WormholeInfoTooltipProps) => {
  const properties = getWormholeProperties(type);

  if (!properties) {
    return children;
  }

  const { mass, lifetimeHrs } = properties;

  const formattedTotalMass = new Intl.NumberFormat().format(
    (mass.total || 0) / 1000000,
  );
  const formattedJumpMass = new Intl.NumberFormat().format(
    (mass.jump || 0) / 1000000,
  );

  const rows = [
    { label: "Lifetime", value: `${lifetimeHrs} h` },
    { label: "Total Mass", value: `${formattedTotalMass} M kg` },
    { label: "Jump Mass", value: `${formattedJumpMass} M kg` },
  ];

  return <GridTooltip rows={rows}>{children}</GridTooltip>;
};

export default WormholeInfoTooltip;
