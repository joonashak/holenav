import { gql } from "@apollo/client";
import { CHARACTER_FIELDS, MAP_FIELDS } from "./fragments";

export const GET_USER_DATA = gql`
  ${CHARACTER_FIELDS}
  ${MAP_FIELDS}
  query UserData {
    whoami {
      id
      systemRole
      main {
        ...CharacterFields
      }
      alts {
        ...CharacterFields
      }
      settings {
        maps {
          ...MapFields
        }
        selectedMap {
          ...MapFields
        }
        activeFolder {
          id
          name
          personal
        }
      }
    }

    getAccessibleFolders {
      id
      name
      personal
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

export const REMOVE_ALT = gql`
  ${CHARACTER_FIELDS}
  mutation RemoveAlt($esiId: String!) {
    removeAlt(esiId: $esiId) {
      alts {
        ...CharacterFields
      }
    }
  }
`;
