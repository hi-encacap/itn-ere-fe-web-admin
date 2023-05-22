import { IREUser } from "@encacap-group/common/dist/re";

import { AUTHENTICATION_API_PATH } from "@constants/apis";
import { AuthTokenAndUserDataType, AuthTokensType } from "@interfaces/Common/authTypes";

import axiosInstance from "@utils/Http/axiosInstance";

const getMe = async (): Promise<IREUser> => {
  const response = await axiosInstance.get(AUTHENTICATION_API_PATH.ME_PATH);

  return response.data.data;
};

const getAuthTokens = () => ({
  accessToken: window.localStorage.getItem("accessToken") ?? "",
  refreshToken: window.localStorage.getItem("refreshToken") ?? "",
});

const setAuthTokens = (
  accessToken: AuthTokensType["accessToken"],
  refreshToken: AuthTokensType["refreshToken"],
) => {
  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);
};

const refreshAccessToken = async (refreshToken: AuthTokensType["refreshToken"]): Promise<AuthTokensType> => {
  const response = await axiosInstance.post(
    AUTHENTICATION_API_PATH.REFRESH_TOKEN_PATH,
    {
      token: refreshToken,
    },
    {
      autoRefreshToken: false,
    },
  );

  return response.data.data.authTokens;
};

const loginWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<AuthTokenAndUserDataType> => {
  const response = await axiosInstance.post(
    AUTHENTICATION_API_PATH.LOGIN_PATH,
    {
      email,
      password,
    },
    {
      autoRefreshToken: false,
    },
  );

  return response.data.data;
};

const logOut = async () => await new Promise((resolve) => setTimeout(() => resolve({}), 1000));

export { getAuthTokens, getMe, logOut, loginWithEmailAndPassword, refreshAccessToken, setAuthTokens };
