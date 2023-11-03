import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { CATEGORY_GROUP_ENUM } from "@encacap-group/common/dist/re";
import { memo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CategorySelector } from "@components/Form";
import { EstateFormDataType } from "@interfaces/Admin/estateTypes";
import { adminCategoryService } from "@services/index";

import FormGroupTitle from "../../../../../../Common/Components/Form/GroupTitle";
import AdminEstateModificationFormDetailDescription from "./Description";
import AdminEstateModificationFormDetailPropertyInputGroup from "./PropertyInputGroup";
import AdminEstateModificationFormDetailQuarterSelector from "./QuarterSelector";

const AdminEstateModificationFormDetail = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<EstateFormDataType>();

  const getCategories = useCallback((query?: IBaseListQuery) => {
    return adminCategoryService.getAllCategories({
      ...query,
      categoryGroupCodes: [CATEGORY_GROUP_ENUM.ESTATE],
      expands: [...(query?.expands ?? []), "categoryGroup"],
    });
  }, []);

  return (
    <div className="border-gray-100 pt-6">
      <FormGroupTitle title={t("title")} />
      <div className="mt-5 grid grid-cols-3 gap-6 pt-0.5">
        <CategorySelector
          name="categoryId"
          label={t("category")}
          placeholder={t("selectCategory")}
          control={control}
          onGet={getCategories}
        />
        <AdminEstateModificationFormDetailQuarterSelector />
        <AdminEstateModificationFormDetailPropertyInputGroup />
      </div>
      <AdminEstateModificationFormDetailDescription />
    </div>
  );
};

export default memo(AdminEstateModificationFormDetail);
