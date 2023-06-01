import { ESTATE_STATUS_ENUM, ICloudflareImageResponse, IPost } from "@encacap-group/common/dist/re";

import { Nullable } from "@interfaces/Common/commonTypes";

export interface PostFormDataType extends Nullable<Partial<Omit<IPost, "avatar">>> {
  categoryId: number | null;
  avatarId?: string | null;
  avatar: ICloudflareImageResponse | null;
  status?: ESTATE_STATUS_ENUM;
}

export interface PostDraftDataType extends Nullable<Partial<IPost>> {
  id: number;
  status: ESTATE_STATUS_ENUM;
}
