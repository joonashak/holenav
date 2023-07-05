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
    onCompleted: (asd) => {
      console.log(asd);
      // console.log(getAppData);
      // const { ...registration } = getAppData.settings.registration;
      // state.set({ registration });
      // console.log(registration);
      // console.log("state set");
      setReady(true);
    },
  });

  if (!ready) {
    return null;
  }

  return <>{children}</>;
};

export default AppSettingsData;
