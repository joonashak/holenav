/**
 * Types describing the shape of the static data files this app generates for
 * other parts of Holenav to rely on.
 */
export type HolenavSystem = {
  name: string;
  securityStatus: number;
  securityClass: string;
  systemEsiId: number;
  effectId: number | null;
};
