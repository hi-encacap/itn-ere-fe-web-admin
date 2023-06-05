import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { PostFormDataType } from "@interfaces/Admin/postTypes";
import { Input } from "@components/Form";
import FormGroupTitle from "@components/Form/GroupTitle";

import AdminCategorySelector from "@admin/Estate/Components/AdminCategorySelector";

const AdminPostModificationFormGeneral = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<PostFormDataType>();

  return (
    <div>
      <FormGroupTitle title={t("generalInfo")} />
      <div className="mt-5 grid grid-cols-1 gap-y-6 pt-0.5">
        <Input
          className="col-span-full block"
          control={control}
          label={t("title")}
          name="title"
          placeholder={t("enterTitle")}
          isRequired
        />
        <div className="col-span-full grid grid-cols-2 gap-x-6">
          <Input
            className="block"
            control={control}
            label={t("code")}
            name="code"
            placeholder={t("enterCode")}
          />
          <AdminCategorySelector control={control} />
        </div>
      </div>
    </div>
  );
};

export default AdminPostModificationFormGeneral;
