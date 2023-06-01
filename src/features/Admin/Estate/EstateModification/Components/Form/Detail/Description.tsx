import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EstateFormDataType } from "@interfaces/Admin/estateTypes";

import Editor from "@components/Form/Editor/Editor";

const AdminEstateModificationFormDetailDescription = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<EstateFormDataType>();

  return (
    <div className="mt-6">
      <Editor control={control} name="description" label={t("content")} />
    </div>
  );
};

export default AdminEstateModificationFormDetailDescription;
