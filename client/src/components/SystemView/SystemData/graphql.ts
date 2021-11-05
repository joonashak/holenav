import { gql } from "@apollo/client";
import { SIGNATURE_FIELDS, WORMHOLE_FIELDS } from "./fragments";

export const GET_SYSTEM_BY_NAME = gql`
  ${SIGNATURE_FIELDS}
  ${WORMHOLE_FIELDS}
  query System($name: String!) {
    getSystemByName(name: $name) {
      id
      name
      signatures {
        ...SignatureFields
      }
    }

    getWormholesBySystem(name: $name) {
      ...WormholeFields
    }
  }
`;

export const ADD_SIGNATURE = gql`
  ${SIGNATURE_FIELDS}
  mutation AddSig($input: AddSignatureInput!) {
    addSignature(input: $input) {
      ...SignatureFields
    }
  }
`;

export const EDIT_SIGNATURE = gql`
  ${SIGNATURE_FIELDS}
  mutation UpdateSignature($input: UpdateSignatureInput!) {
    updateSignature(input: $input) {
      ...SignatureFields
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
  ${WORMHOLE_FIELDS}
  mutation AddWormhole($input: AddWormholeInput!) {
    addWormhole(input: $input) {
      ...WormholeFields
    }
  }
`;

export const EDIT_WORMHOLE = gql`
  ${WORMHOLE_FIELDS}
  mutation UpdateWormhole($input: UpdateWormholeInput!) {
    updateWormhole(input: $input) {
      ...WormholeFields
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
