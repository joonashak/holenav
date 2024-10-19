import { FindConnectionGraphQuery } from "../../../../generated/graphqlOperations";

const buildConnectionTree = (
  from: string,
  data: FindConnectionGraphQuery | undefined,
) => {
  if (!data) {
    return { name: from, children: [] };
  }

  // TODO: Sort children at all levels.
  return { name: from, children: [] };
};

export default buildConnectionTree;
