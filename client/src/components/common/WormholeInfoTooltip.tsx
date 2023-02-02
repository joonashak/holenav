import { ReactElement } from "react";
import { Signature } from "../../generated/graphqlOperations";
import { getWormholeProperties, getWormholeTrueType } from "../../utils/wormholeUtils";
import GridTooltip from "./GridToolTip";

type WormholeInfoTooltipProps = {
  children: ReactElement;
  signature: Signature;
};

const WormholeInfoTooltip = ({ children, signature }: WormholeInfoTooltipProps) => {
  const properties = getWormholeProperties(getWormholeTrueType(signature));

  const formattedTotalMass = new Intl.NumberFormat().format(
    (properties?.mass.total || 0) / 1000000
  );
  const formattedJumpMass = new Intl.NumberFormat().format((properties?.mass.jump || 0) / 1000000);

  const rows = [
    { label: "Lifetime", value: `${properties?.lifetimeHrs} h` },
    { label: "Total Mass", value: `${formattedTotalMass} M kg` },
    { label: "Jump Mass", value: `${formattedJumpMass} M kg` },
  ];

  return <GridTooltip rows={rows}>{children}</GridTooltip>;
};

export default WormholeInfoTooltip;
