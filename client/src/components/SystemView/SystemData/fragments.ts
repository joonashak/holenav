import { gql } from "@apollo/client";

export const SIGNATURE_FIELDS = gql`
  fragment SignatureFields on Signature {
    id
    name
    type
    eveId
    eol
    massStatus
    destinationName
    wormholeType
    reverseType
  }
`;
