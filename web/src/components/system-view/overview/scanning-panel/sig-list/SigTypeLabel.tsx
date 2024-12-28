import { FindSignature } from "../../../../../generated/graphql-operations";
import WormholeInfoTooltip from "../../../../common/WormholeInfoTooltip";

type SigTypeLabelProps = {
  signature: FindSignature;
};

const SigTypeLabel = ({ signature }: SigTypeLabelProps) => {
  const type = signature.connection?.type;
  const label = type || signature.type.toLowerCase();

  if (!type) {
    return <>{label}</>;
  }

  return (
    <WormholeInfoTooltip type={type}>
      <>{label}</>
    </WormholeInfoTooltip>
  );
};

export default SigTypeLabel;
