import { Avatar, ListItem, ListItemAvatar, ListItemProps, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import useEsiAlliance from "../../../services/esi/useEsiAlliance";
import useEsiCorporation from "../../../services/esi/useEsiCorporation";
import eveImageServerUrl, { EveImageServerCategories } from "../../../services/eveImageServerUrl";
import RemoveOrganizationButton from "./RemoveOrganizationButton";

type OrganizationListItemProps = ListItemProps & {
  alliance?: boolean;
  esiId: string;
};

const OrganizationListItem = ({
  alliance = false,
  esiId,
  ...listItemProps
}: OrganizationListItemProps) => {
  const { getPublicInfo } = useEsiCorporation();
  const { getPublicInfo: getAlliancePublicInfo } = useEsiAlliance();
  const [publicInfo, setPublicInfo] = useState<{ name: string; ticker: string }>();

  useEffect(() => {
    (async () => {
      const { name, ticker } = await (alliance
        ? getAlliancePublicInfo(Number(esiId))
        : getPublicInfo(Number(esiId)));
      setPublicInfo({ name, ticker });
    })();
  }, []);

  if (!publicInfo) {
    return <ListItem>Loading...</ListItem>;
  }

  const imageCategory = alliance
    ? EveImageServerCategories.ALLIANCES
    : EveImageServerCategories.CORPORATIONS;

  return (
    <ListItem
      {...listItemProps}
      secondaryAction={<RemoveOrganizationButton alliance={alliance} esiId={esiId} />}
    >
      <ListItemAvatar>
        <Avatar alt={publicInfo.name} src={eveImageServerUrl(imageCategory, esiId, 128)} />
      </ListItemAvatar>
      <ListItemText
        primary={publicInfo.name}
        secondary={`[${publicInfo.ticker}]`}
        secondaryTypographyProps={{ sx: { color: "secondary.light" } }}
      />
    </ListItem>
  );
};

export default OrganizationListItem;
