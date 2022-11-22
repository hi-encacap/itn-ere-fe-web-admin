import { AuthTokensType } from '../../Types/Common/authTypes';
import { UserDataType, UserRoleDataType, UserWebsiteDataType } from '../../Types/Common/userTypes';

const roleData: UserRoleDataType[] = [
  {
    name: 'User',
    slug: 'user',
  },
];

const websiteData: UserWebsiteDataType = {
  id: 1,
  name: 'My Website',
  url: 'https://mywebsite.com',
};

const userData: UserDataType = {
  id: 1,
  username: 'admin',
  email: 'encacap@gmail.com',
  firstName: 'Admin',
  lastName: 'Admin',
  roles: roleData,
  websiteId: websiteData.id,
  website: websiteData,
};

const getMe = async (): Promise<UserDataType> =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 1000);
  });

const getAccessTokens = () => ({
  accessToken: window.localStorage.getItem('accessToken') !== null || '',
  refreshToken: window.localStorage.getItem('refreshToken') !== null || '',
});

const setAccessTokens = (
  accessToken: AuthTokensType['accessToken'],
  refreshToken: AuthTokensType['refreshToken'],
) => {
  window.localStorage.setItem('accessToken', accessToken);
  window.localStorage.setItem('refreshToken', refreshToken);
};

const refreshAccessToken = async (refreshToken: AuthTokensType['refreshToken']): Promise<AuthTokensType> => {
  return await new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        accessToken: 'newAccessToken',
        refreshToken,
      });
    }, 1000);
  });
};

const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserDataType> =>
  await new Promise((resolve) => setTimeout(() => resolve(userData), 1000));

const logOut = async () => await new Promise((resolve) => setTimeout(() => resolve({}), 1000));

export { getMe, getAccessTokens, setAccessTokens, refreshAccessToken, loginWithEmailAndPassword, logOut };
