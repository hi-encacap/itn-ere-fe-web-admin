import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { adminCategoryGroupService } from "@services/index";
import { Select } from "@components/Form";
import { SelectProps } from "@components/Form/Select/Select";

const CategoryGroupSelector = ({
  ...props
}: Omit<SelectProps, "options" | "name" | "label" | "placeholder">) => {
  const { t } = useTranslation();

  const [categoryGroupOptions, setCategoryGroupOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOptions = useCallback(() => {
    setIsLoading(true);

    adminCategoryGroupService
      .getCategoryGroups()
      .then((categoryGroups) => {
        const options = categoryGroups.map((categoryGroup) => ({
          value: categoryGroup.code,
          label: t(categoryGroup.code),
        }));

        setCategoryGroupOptions(options);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <Select
      name="categoryGroupCode"
      label={t("categoryGroup")}
      placeholder={t("selectCategoryGroup")}
      className="block"
      options={categoryGroupOptions}
      disabled={isLoading}
      {...props}
    />
  );
};

export default CategoryGroupSelector;
