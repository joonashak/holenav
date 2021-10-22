import { gql } from "@apollo/client";

export const GET_SYSTEM_BY_NAME = gql`
  query System($name: String!) {
    getSystemByName(name: $name) {
      id
      name
      signatures {
        id
        name
        type
        eveId
      }
    }

    getWormholesBySystem(name: $name) {
      name
      id
      eveId
      type
      eol
      massStatus
      destinationName
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

export const ADD_WORMHOLE = gql`
  mutation AddWormhole($input: AddWormholeInput!) {
    addWormhole(input: $input) {
      id
      eveId
      name
      type
      eol
    }
  }
`;

export const EDIT_WORMHOLE = gql`
  mutation UpdateWormhole($input: UpdateWormholeInput!) {
    updateWormhole(input: $input) {
      name
      id
      eveId
      type
      eol
      massStatus
      destinationName
    }
  }
`;
