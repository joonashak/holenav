export enum EveImageServerCategories {
  ALLIANCES = "alliances",
  CORPORATIONS = "corporations",
  CHARACTERS = "characters",
}

type EveImageServerImageSize = undefined | 32 | 64 | 128 | 256 | 512 | 1024;

const eveImageServerUrl = (
  category: EveImageServerCategories,
  id: string,
  size?: EveImageServerImageSize,
) => {
  const variation = category === EveImageServerCategories.CHARACTERS ? "portrait" : "logo";
  const queryParams = size ? `?size=${size}` : "";
  return `https://images.evetech.net/${category}/${id}/${variation}${queryParams}`;
};

export default eveImageServerUrl;
