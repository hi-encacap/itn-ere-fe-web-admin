import { IContact } from "@encacap-group/common/dist/re";

import { Nullable } from "@interfaces/Common/commonTypes";
import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

export interface ContactFormDataType extends Omit<Nullable<IContact>, "avatar" | "id" | "avatarId"> {
  avatar: FormImageInputDataType | null;
}
