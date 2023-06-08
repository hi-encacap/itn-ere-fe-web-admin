import { TFunction } from "i18next";
import { number, object, string } from "yup";

import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";
import { generateFormSchema } from "@utils/schema";

const categoryFormSchema = (t: TFunction, role: Record<string, boolean>) =>
  generateFormSchema<CategoryFormDataType>({
    name: string().required(t("form.name.required")),
    categoryGroupCode: string().required(t("form.categoryGroupCode.required")),
    thumbnail: object().required(t("form.thumbnail.required")).nullable(),
    parentId: number().when("isRoot", {
      is: false,
      then: number().required(t("form.parentId.required")).nullable(),
    }),
    websiteId: number().when("isRoot", {
      is: true,
      then: number().required(t("form.websiteId.required")).nullable(),
      otherwise: number(),
    }),
  });

export { categoryFormSchema };
