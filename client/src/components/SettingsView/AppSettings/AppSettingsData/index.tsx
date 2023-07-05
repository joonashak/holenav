import { createState, useState } from "@hookstate/core";
import { ReactNode, useState as useReactState } from "react";
import useAuthenticatedQuery from "../../../../auth/useAuthenticatedQuery";
import {
  AppSettings,
  AppSettingsDocument,
  AppSettingsQuery,
  AppSettingsQueryVariables,
} from "../../../../generated/graphqlOperations";

export const appSettingsState = createState<AppSettings>({
  registration: {
    enabled: true,
    corporationFilterEnabled: false,
    allianceFilterEnabled: false,
    allowedAlliances: [],
    allowedCorporations: [],
  },
});

type AppSettingsDataProps = {
  children: ReactNode;
};

const AppSettingsData = ({ children }: AppSettingsDataProps) => {
  const state = useState(appSettingsState);
  const [ready, setReady] = useReactState(false);

  useAuthenticatedQuery<AppSettingsQuery, AppSettingsQueryVariables>(AppSettingsDocument, {
    onCompleted: ({ getAppData }) => {
      state.set(getAppData.settings);
      console.log("state set");
      setReady(true);
    },
  });

  if (!ready) {
    return null;
  }

  return <>{children}</>;
};

export default AppSettingsData;
