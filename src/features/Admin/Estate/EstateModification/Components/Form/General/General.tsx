import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EstateFormDataType } from "@interfaces/Admin/estateTypes";

import { Input } from "@components/Form";

import AdminEstateModificationFormTitle from "../Title";
import AdminEstateModificationFormGeneralAreaInputGroup from "./AreaInputGroup";
import AdminEstateModificationFormGeneralPriceInputGroup from "./PriceInputGroup";

const AdminEstateModificationFormGeneral = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.form.general",
  });

  const { control } = useFormContext<EstateFormDataType>();

  return (
    <div>
      <AdminEstateModificationFormTitle title={t("title")} />
      <div className="mt-5 grid grid-cols-1 gap-y-6 pt-0.5">
        <Input
          className="block"
          control={control}
          isRequired
          label={t("form.title.label")}
          name="title"
          placeholder={t("form.title.placeholder")}
        />
        <div className="grid grid-cols-3 gap-x-6">
          <Input
            name="customId"
            className="block"
            label={t("form.customId.label")}
            placeholder={t("form.customId.placeholder")}
            control={control}
          />
          <AdminEstateModificationFormGeneralPriceInputGroup />
          <AdminEstateModificationFormGeneralAreaInputGroup />
        </div>
      </div>
    </div>
  );
};

export default AdminEstateModificationFormGeneral;
