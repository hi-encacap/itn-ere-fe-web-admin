import { TFunction } from "i18next";
import { object, string } from "yup";

import { phoneRegex } from "@constants/regexs";
import { ContactFormDataType } from "@interfaces/Admin/contactTypes";

import { generateFormSchema } from "@utils/schema";

const contactFormSchema = (t: TFunction) =>
  generateFormSchema<ContactFormDataType>({
    name: string().required(t("form.name.required")),
    phone: string().required(t("form.phone.required")).matches(phoneRegex, t("form.phone.invalid")),
    zalo: string().required(t("form.zalo.required")).matches(phoneRegex, t("form.zalo.invalid")),
    email: string(),
    avatar: object().required(t("form.avatar.required")).nullable(),
  });

export { contactFormSchema };
