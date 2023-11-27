import { ESTATE_STATUS_ENUM, ICategory, IPost } from "@encacap-group/common/dist/re";

import { Nullable } from "@interfaces/Common/commonTypes";
import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

export interface PostFormDataType extends Nullable<Partial<Omit<IPost, "avatar" | "category">>> {
  categoryId: number | null;
  avatarId?: string | null;
  avatar: FormImageInputDataType;
  status?: ESTATE_STATUS_ENUM;
  category?: Omit<ICategory, "parent"> | null;
  images: FormImageInputDataType[];
}

export interface PostDraftDataType extends Nullable<Partial<IPost>> {
  title: string;
  id: number;
  status: ESTATE_STATUS_ENUM;
}
