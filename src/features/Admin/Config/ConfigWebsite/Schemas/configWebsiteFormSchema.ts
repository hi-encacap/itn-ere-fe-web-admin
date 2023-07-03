import { ACB_CONFIG_CODE_ENUM } from "@encacap-group/common/dist/re";
import { TFunction } from "i18next";
import { array, number, object, string } from "yup";

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

const configWebsiteHomeHeroFormSchema = (t: TFunction) =>
  generateFormSchema({
    [ACB_CONFIG_CODE_ENUM.HOMEPAGE_HERO_IMAGE]: array(object()).required(t("imageRequired")),
  });

const configWebsiteHomeIntroduceFormSchema = (t: TFunction) =>
  generateFormSchema({
    [ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE]: array(object()).required(t("imageRequired")),
    [ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_POST]: number().required(t("postRequired")),
  });

export {
  configWebsiteContactFormSchema,
  configWebsiteGeneralFormSchema,
  configWebsiteHomeHeroFormSchema,
  configWebsiteHomeIntroduceFormSchema,
};
