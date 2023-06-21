import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

export interface CategoryFormDataType {
  name: string;
  categoryGroupCode: string;
  avatar: FormImageInputDataType | null;
  avatarId?: string;
  parentId: number | null;
  websiteId: number | null;
}
