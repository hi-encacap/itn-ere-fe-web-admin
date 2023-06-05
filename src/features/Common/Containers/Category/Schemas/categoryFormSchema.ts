import { TFunction } from "i18next";
import { number, object, string } from "yup";

import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";
import { generateFormSchema } from "@utils/schema";

const categoryFormSchema = (t: TFunction, role: Record<string, boolean>) =>
  generateFormSchema<CategoryFormDataType>({
    name: string().required(t("form.name.required")),
    categoryGroupCode: string().required(t("form.categoryGroupCode.required")),
    thumbnail: object().required(t("form.thumbnail.required")).nullable(),
    parentId: !role.isRoot ? number().required(t("form.parentId.required")) : number().nullable(),
    websiteId: role.isRoot ? number().required(t("form.websiteId.required")) : number().nullable(),
  });

export { categoryFormSchema };
