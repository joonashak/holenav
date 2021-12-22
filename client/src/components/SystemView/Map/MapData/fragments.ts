import { gql } from "@apollo/client";
import { WORMHOLE_FIELDS } from "../../SystemData/fragments";

const NODE_FIELDS = gql`
  ${WORMHOLE_FIELDS}
  fragment NodeFields on ConnectionTreeNode {
    name
    wormholeId
    destinationName
    type
    reverseType
    eol
    massStatus
    wormhole {
      ...WormholeFields
    }
  }
`;

export const RECURSIVE_CONNECTION_TREE = gql`
  ${NODE_FIELDS}
  fragment RecursiveConnectionTree on ConnectionTree {
    children {
      ...NodeFields
      children {
        ...NodeFields
        children {
          ...NodeFields
          children {
            ...NodeFields
            children {
              ...NodeFields
              children {
                ...NodeFields
                children {
                  ...NodeFields
                  children {
                    ...NodeFields
                    children {
                      ...NodeFields
                      children {
                        ...NodeFields
                        children {
                          ...NodeFields
                          children {
                            ...NodeFields
                            children {
                              ...NodeFields
                              children {
                                ...NodeFields
                                children {
                                  ...NodeFields
                                  children {
                                    ...NodeFields
                                    children {
                                      ...NodeFields
                                      children {
                                        ...NodeFields
                                        children {
                                          ...NodeFields
                                          children {
                                            ...NodeFields
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
