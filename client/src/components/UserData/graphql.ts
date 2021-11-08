import { gql } from "@apollo/client";
import { MAP_FIELDS } from "./fragments";

export const GET_SYSTEM_DATA = gql`
  query SystemData {
    whoami {
      id
      activeFolder {
        id
      }
      settings {
        maps {
          id
          name
          rootSystemName
        }
        selectedMap {
          id
          name
          rootSystemName
        }
      }
    }
  }
`;

export const UPDATE_SELECTED_MAP = gql`
  ${MAP_FIELDS}
  mutation UpdateSelectedMap($selectedMapId: String!) {
    updateSelectedMap(selectedMapId: $selectedMapId) {
      settings {
        selectedMap {
          ...MapFields
        }
      }
    }
  }
`;

export const ADD_SAVED_MAP = gql`
  ${MAP_FIELDS}
  mutation AddSavedMap($name: String!, $rootSystemName: String!) {
    addSavedMap(name: $name, rootSystemName: $rootSystemName) {
      settings {
        maps {
          ...MapFields
        }
      }
    }
  }
`;

export const DELETE_SAVED_MAP = gql`
  ${MAP_FIELDS}
  mutation DeleteSavedMap($mapId: String!) {
    deleteSavedMap(mapId: $mapId) {
      settings {
        maps {
          ...MapFields
        }
      }
    }
  }
`;
