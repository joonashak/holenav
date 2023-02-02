import { Signature } from "../../../../../generated/graphqlOperations";
import { getWormholeTrueType } from "../../../../../utils/wormholeUtils";
import WormholeInfoTooltip from "../../../../common/WormholeInfoTooltip";

type SigTypeLabelProps = {
  signature: Signature;
};

const SigTypeLabel = ({ signature }: SigTypeLabelProps) => {
  const label = signature.wormholeType || signature.type.toLowerCase();
  const trueType = getWormholeTrueType(signature);

  if (!trueType) {
    return <>{label}</>;
  }

  return (
    <WormholeInfoTooltip type={trueType}>
      <>{label}</>
    </WormholeInfoTooltip>
  );
};

export default SigTypeLabel;
