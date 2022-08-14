import { gql } from "@apollo/client";
import { SIGNATURE_FIELDS } from "./fragments";

// FIXME: Move these into signature.graphql to take advantage of code generation.

export const GET_SYSTEM_BY_NAME = gql`
  ${SIGNATURE_FIELDS}
  query System($name: String!) {
    getSystemByName(name: $name) {
      id
      name
    }

    getSignaturesBySystem(systemName: $name) {
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
