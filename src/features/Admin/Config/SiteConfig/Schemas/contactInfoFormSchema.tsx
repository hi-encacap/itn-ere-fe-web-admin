import { TFunction } from "i18next";
import { object, string } from "yup";

export const contactInfoFormSchema = (t: TFunction, requiredFields: string[]) =>
  object().shape({
    phone: string().when([], {
      is: () => requiredFields.includes("phone"),
      then: string().required(t("phoneRequired")),
    }),
    email: string().when([], {
      is: () => requiredFields.includes("email"),
      then: string().required(t("emailRequired")),
    }),
    address: string().when([], {
      is: () => requiredFields.includes("address"),
      then: string().required(t("addressRequired")),
    }),
    bank: string().when([], {
      is: () => requiredFields.includes("bank"),
      then: string().required(t("bankRequired")),
    }),
    tax: string().when([], {
      is: () => requiredFields.includes("tax"),
      then: string().required(t("taxRequired")),
    }),
  });
