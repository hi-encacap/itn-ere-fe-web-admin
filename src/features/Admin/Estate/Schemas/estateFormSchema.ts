import { TFunction } from "i18next";
import { array, number, object, string } from "yup";

import { EstateFormDataType } from "@interfaces/Admin/estateTypes";

import { generateFormSchema } from "@utils/schema";

const estateFormSchema = (t: TFunction) =>
  generateFormSchema<EstateFormDataType>({
    title: string().required(t("form.general.form.title.required")).nullable(),
    customId: string()
      .nullable()
      .matches(/^[a-zA-Z0-9]+$/, t("form.general.form.customId.invalid")),
    price: number().required(t("form.general.form.price.required")).nullable(),
    priceUnitId: number().required(t("form.general.form.priceUnitId.required")).nullable(),
    area: number().required(t("form.general.form.area.required")).nullable(),
    areaUnitId: number().required(t("form.general.form.areaUnitId.required")).nullable(),
    provinceCode: string().required(t("required")).nullable(),
    districtCode: string().required(t("required")).nullable(),
    wardCode: string().required(t("required")).nullable(),
    address: string().required(t("form.location.form.address.required")).nullable(),
    addressNote: string().nullable(),
    categoryId: number().required(t("required")).nullable(),
    quarterCode: string().nullable(),
    properties: array().of(
      object().shape({
        id: number().nullable(),
        value: string().nullable(),
      }),
    ),
    description: string().required(t("form.detail.form.description.required")).nullable(),
    contactId: number().required(t("form.contact.required")).nullable(),
    avatar: object().required(t("form.media.form.avatar.required")).nullable(),
    images: array().min(1),
  });

export { estateFormSchema };
