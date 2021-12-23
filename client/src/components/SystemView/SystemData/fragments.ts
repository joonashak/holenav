import { gql } from "@apollo/client";

export const SIGNATURE_FIELDS = gql`
  fragment SignatureFields on Signature {
    id
    name
    type
    eveId
  }
`;

export const WORMHOLE_FIELDS = gql`
  fragment WormholeFields on Wormhole {
    name
    id
    eveId
    type
    eol
    massStatus
    destinationName
    reverseType
  }
`;
