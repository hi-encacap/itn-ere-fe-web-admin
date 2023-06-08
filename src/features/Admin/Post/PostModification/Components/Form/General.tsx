import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { Input } from "@components/Form";
import FormGroupTitle from "@components/Form/GroupTitle";
import { PostFormDataType } from "@interfaces/Admin/postTypes";

import AdminCategorySelector from "@admin/Estate/Components/AdminCategorySelector";

interface AdminPostModificationFormGeneralProps {
  isEditMode?: boolean;
}

const AdminPostModificationFormGeneral = ({ isEditMode }: AdminPostModificationFormGeneralProps) => {
  const { t } = useTranslation();

  const { control } = useFormContext<PostFormDataType>();

  return (
    <div>
      <FormGroupTitle title={t("generalInfo")} />
      <div className={twMerge("mt-5 grid grid-cols-1 gap-y-6 gap-x-6 pt-0.5", isEditMode && "grid-cols-2")}>
        <Input
          className="col-span-full block"
          control={control}
          label={t("title")}
          name="title"
          placeholder={t("enterTitle")}
          isRequired
        />
        <div className={twMerge("grid grid-cols-2 gap-x-6", isEditMode && "grid-cols-1")}>
          {!isEditMode && (
            <Input
              className="block"
              control={control}
              label={t("code")}
              name="code"
              placeholder={t("enterCode")}
            />
          )}
          <AdminCategorySelector control={control} />
        </div>
      </div>
    </div>
  );
};

export default AdminPostModificationFormGeneral;
