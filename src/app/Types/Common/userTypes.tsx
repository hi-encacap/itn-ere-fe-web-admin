export interface UserRoleDataType {
  name: string;
  slug?: string;
}

export interface UserWebsiteDataType {
  id: number;
  name: string;
  url: string;
}

export interface UserDataType {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  websiteId: number;
  website: UserWebsiteDataType;
  roles: UserRoleDataType[];
}
