import { ESTATE_STATUS_ENUM, IPost } from "@encacap-group/common/dist/re";

import { Nullable } from "@interfaces/Common/commonTypes";
import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

export interface PostFormDataType extends Nullable<Partial<Omit<IPost, "avatar">>> {
  categoryId: number | null;
  avatarId?: string | null;
  avatar: FormImageInputDataType;
  status?: ESTATE_STATUS_ENUM;
}

export interface PostDraftDataType extends Nullable<Partial<IPost>> {
  title: string;
  id: number;
  status: ESTATE_STATUS_ENUM;
}
