import AppLink from "../../../common/AppLink";

type RootNodeNameProps = {
  rootSystemName: string;
  mapName: string;
};

const RootNodeName = ({ rootSystemName, mapName }: RootNodeNameProps) => (
  <AppLink to={`/system/${rootSystemName}`}>{mapName}</AppLink>
);

export default RootNodeName;
