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
      reverse {
        type
      }
    }
  }
`;

export const ADD_SIGNATURE = gql`
  mutation AddSig($input: AddSignatureInput!) {
    addSignature(input: $input) {
      id
      name
      type
      eveId
    }
  }
`;

export const EDIT_SIGNATURE = gql`
  mutation UpdateSignature($input: UpdateSignatureInput!) {
    updateSignature(input: $input) {
      id
      name
      type
      eveId
    }
  }
`;

export const DELETE_SIGNATURE = gql`
  mutation DeleteSignature($id: String!) {
    deleteSignature(id: $id) {
      id
    }
  }
`;

export const ADD_WORMHOLE = gql`
  mutation AddWormhole($input: AddWormholeInput!) {
    addWormhole(input: $input) {
      name
      id
      eveId
      type
      eol
      massStatus
      destinationName
      reverse {
        type
      }
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
      reverse {
        type
      }
    }
  }
`;

export const DELETE_WORMHOLE = gql`
  mutation DeleteWormhole($id: String!) {
    deleteWormhole(id: $id) {
      id
    }
  }
`;
