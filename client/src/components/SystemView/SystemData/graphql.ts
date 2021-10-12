import { gql } from "@apollo/client";

export const GET_SYSTEM_BY_NAME = gql`
  query System($name: String!, $folderId: String!) {
    getSystemByName(name: $name, folderId: $folderId) {
      id
      name
      signatures {
        id
        name
        type
        eveId
      }
    }

    getWormholesBySystem(name: $name, folderId: $folderId) {
      name
      id
      eveId
      type
      eol
      massStatus
      destinationName
      reverse {
        id
      }
    }
  }
`;

export const ADD_SIGNATURE = gql`
  mutation AddSig($systemId: String!, $type: SigTypes!, $eveId: String!, $name: String!) {
    addSignature(systemId: $systemId, type: $type, eveId: $eveId, name: $name) {
      id
      name
      type
      eveId
    }
  }
`;
