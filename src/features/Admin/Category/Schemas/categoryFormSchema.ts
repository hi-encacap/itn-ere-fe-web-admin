import { TFunction } from "i18next";
import { object, string } from "yup";

import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";

import { generateFormSchema } from "@utils/schema";

const categoryFormSchema = (t: TFunction) =>
  generateFormSchema<CategoryFormDataType>({
    name: string().required(t("form.name.required")),
    categoryGroupCode: string().required(t("form.categoryGroupCode.required")),
    thumbnail: object().required(t("form.thumbnail.required")).nullable(),
  });

export { categoryFormSchema };
