import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { set } from "lodash";
import useLocalData from "../components/local-data/useLocalData";
import useUserSettings from "../components/user-data/settings/useUserSettings";
import { backendUrl, devToolsEnabled } from "../config";
import useAuth from "./useAuth";

const useAuthenticatedRestApi = () => {
  const { token } = useAuth();
  const { activeFolder } = useUserSettings();
  const { devKey } = useLocalData();

  const baseConfig: AxiosRequestConfig = {
    headers: { accesstoken: token || "", activefolder: activeFolder?.id || "" },
  };

  if (devToolsEnabled && devKey) {
    set(baseConfig, "headers.devkey", devKey);
  }

  const get = async (path: string): Promise<AxiosResponse> => {
    const url = [backendUrl, path].join("/");
    return axios.get(url, baseConfig);
  };

  return { get };
};

export default useAuthenticatedRestApi;
