import { gql } from "@apollo/client";

const NODE_FIELDS = gql`
  fragment NodeFields on ConnectionTreeNode {
    name
    destinationName
    type
    reverseType
    eol
    massStatus
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
