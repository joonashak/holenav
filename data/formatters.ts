type EsiSystemData = {
  name: string;
  security: number;
  solarSystemID: number;
};

export const formatSystem = ({
  name,
  security,
  solarSystemID,
}: EsiSystemData) => ({
  name,
  securityStatus: security,
  systemEsiId: solarSystemID,
});
