import { gql, useQuery } from "@apollo/client";
import Overview from "./Overview";

interface SystemViewProps {
  match: {
    params: {
      systemName: string;
    };
  };
}

export default ({ match }: SystemViewProps) => {
  const { systemName } = match.params;

  // TODO: Probably move all this to context?
  const query = gql`
    query System($name: String!) {
      getSystemByName(name: $name) {
        name
      }
    }
  `;

  // FIXME: Fires null query first.
  const { data } = useQuery(query, { variables: { name: systemName } });
  // eslint-disable-next-line
  console.log("system", data);

  return <Overview />;
};
