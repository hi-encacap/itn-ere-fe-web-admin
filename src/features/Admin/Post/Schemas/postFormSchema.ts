import { TFunction } from "i18next";
import { number, object, string } from "yup";

import { PostFormDataType } from "@interfaces/Admin/postTypes";

import { generateFormSchema } from "@utils/schema";

const postFormSchema = (t: TFunction) =>
  generateFormSchema<PostFormDataType>({
    title: string().required(t("titleRequired")).nullable(),
    categoryId: number().required(t("categoryRequired")).nullable(),
    id: number().nullable(),
    content: string().required(t("contentRequired")).nullable(),
    avatar: object().required(t("avatarRequired")).nullable(),
  });

export default postFormSchema;
