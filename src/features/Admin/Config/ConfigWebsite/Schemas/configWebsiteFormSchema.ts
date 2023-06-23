import { TFunction } from "i18next";
import { string } from "yup";

import { WebsiteConfigFormDataType } from "@interfaces/Admin/websiteConfigTypes";
import { WebsiteFormDataType } from "@interfaces/Admin/websiteTypes";
import { generateFormSchema } from "@utils/schema";

const configWebsiteGeneralFormSchema = (t: TFunction) =>
  generateFormSchema<WebsiteFormDataType>({
    name: string().required(t("websiteNameRequired")),
    description: string().required(t("descriptionRequired")),
  });

const configWebsiteContactFormSchema = (t: TFunction) =>
  generateFormSchema<WebsiteConfigFormDataType>({
    emailAddress: string().required(t("emailRequired")).email(t("emailInvalid")),
    phoneNumber: string().required(t("phoneRequired")),
    address: string().required(t("addressRequired")),
    bankAccount: string().required(t("bankAccountRequired")),
    taxNumber: string().required(t("taxRequired")),
  });

export { configWebsiteContactFormSchema, configWebsiteGeneralFormSchema };
