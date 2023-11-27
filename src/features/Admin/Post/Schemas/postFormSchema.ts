import { TFunction } from "i18next";
import { array, number, object, string } from "yup";

import { PostFormDataType } from "@interfaces/Admin/postTypes";
import { generateFormSchema } from "@utils/schema";

const postFormSchema = (t: TFunction) =>
  generateFormSchema<PostFormDataType>({
    title: string().required(t("titleRequired")).nullable(),
    categoryId: number().required(t("categoryRequired")).nullable(),
    id: number().nullable(),
    content: string().required(t("contentRequired")).nullable(),
    avatar: object().required(t("avatarRequired")).nullable(),
    images: array().min(1).required(t("imageRequired")).nullable(),
  });

export default postFormSchema;
