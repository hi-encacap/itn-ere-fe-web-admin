import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { HookFormControl } from "@interfaces/Common/commonTypes";
import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { adminCategoryService } from "@services/index";

import { Select } from "@components/Form";

import { commonFormErrorFactory } from "@utils/error";

interface AdminCategorySelectorProps {
  control: HookFormControl;
  disabled?: boolean;
}

const AdminCategorySelector = ({ control, disabled }: AdminCategorySelectorProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.estate.form.category",
  });
  const [options, setOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOptions = useCallback(() => {
    setIsLoading(true);

    adminCategoryService
      .getCategories()
      .then(({ data }) => {
        setOptions(
          data.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <Select
      name="categoryId"
      label={t("label")}
      placeholder={t("placeholder")}
      control={control}
      options={options}
      className="block"
      isRequired
      disabled={disabled ?? isLoading}
      errorFactory={commonFormErrorFactory(t)}
    />
  );
};

export default AdminCategorySelector;
