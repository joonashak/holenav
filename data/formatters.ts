type EsiSystemData = {
  name: string;
  security_status: number;
  system_id: number;
  constellation_id: number;
};

export const formatSystem = ({
  name,
  security_status,
  system_id,
  constellation_id,
}: EsiSystemData) => ({
  name,
  security_status,
  system_esi_id: system_id,
  constellation_esi_id: constellation_id,
});
