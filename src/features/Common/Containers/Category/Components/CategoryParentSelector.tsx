import { ICategory } from "@encacap-group/common/dist/re";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UseFormSetValue, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";
import { adminCategoryService } from "@services/index";

import { Select } from "@components/Form";
import { SelectProps } from "@components/Form/Select/Select";

import CategoryParentSelectorOption from "./CategoryParentSelectorOption";

interface ParentCategorySelectorProps
  extends Omit<SelectProps, "options" | "name" | "label" | "placeholder" | "onChange"> {
  onChange: UseFormSetValue<CategoryFormDataType>;
}

const ParentCategorySelector = ({ control, onChange, ...props }: ParentCategorySelectorProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [parentCategories, setParentCategories] = useState<ICategory[]>([]);

  const selectedParentId = useWatch({
    control,
    name: "parentId",
  });

  const parentCategoryOptions = useMemo(
    () =>
      parentCategories.map((item) => ({
        value: item.id,
        label: <CategoryParentSelectorOption data={item} />,
      })),
    [parentCategories],
  );
  const selectedParentCategory = useMemo(
    () => parentCategories.find((item) => item.id === selectedParentId),
    [parentCategories, selectedParentId],
  );

  const getOptions = useCallback(() => {
    setIsLoading(true);

    adminCategoryService
      .getAllCategories()
      .then((categories) => {
        setParentCategories(categories);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  useEffect(() => {
    if (selectedParentCategory) {
      onChange("categoryGroupCode", selectedParentCategory.categoryGroupCode);
    }
  }, [selectedParentCategory, onChange]);

  return (
    <Select
      name="parentId"
      label={t("parentCategory")}
      placeholder={t("selectParentCategory")}
      className="block"
      options={parentCategoryOptions}
      disabled={isLoading}
      control={control}
      {...props}
    />
  );
};

export default ParentCategorySelector;
