import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useUserSettings from "../components/UserData/settings/useUserSettings";
import { backendUrl, devToolsEnabled } from "../config";
import useAuth from "./useAuth";
import useLocalData from "../components/LocalData/useLocalData";
import { set } from "lodash";

const useAuthenticatedRestApi = () => {
  const { token } = useAuth();
  const { activeFolder } = useUserSettings();
  const { devKey } = useLocalData();

  const baseConfig: AxiosRequestConfig = {
    headers: { accesstoken: token || "", activefolder: activeFolder.id },
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
