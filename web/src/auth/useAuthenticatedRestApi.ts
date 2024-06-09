import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useUserSettings from "../components/user-data/settings/useUserSettings";
import { backendUrl } from "../config";
import useAuth from "./useAuth";

const useAuthenticatedRestApi = () => {
  const { token } = useAuth();
  const { activeFolder } = useUserSettings();

  const baseConfig: AxiosRequestConfig = {
    headers: { accesstoken: token || "", activefolder: activeFolder?.id || "" },
  };

  const get = async (path: string): Promise<AxiosResponse> => {
    const url = [backendUrl, path].join("/");
    return axios.get(url, baseConfig);
  };

  return { get };
};

export default useAuthenticatedRestApi;
