import { userRoleSelector } from "@selectors/commonSliceSelectors";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Select } from "@components/Form";
import { SelectProps } from "@components/Form/Select/Select";
import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { adminCategoryGroupService, rootCategoryService } from "@services/index";

const CategoryGroupSelector = ({
  ...props
}: Omit<SelectProps, "options" | "name" | "label" | "placeholder">) => {
  const { t } = useTranslation();

  const [categoryGroupOptions, setCategoryGroupOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isRoot } = useSelector(userRoleSelector);

  const getOptions = useCallback(() => {
    setIsLoading(true);

    let service = adminCategoryGroupService.getCategoryGroups;

    if (isRoot) {
      service = rootCategoryService.getCategoryGroups;
    }

    service()
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
  }, [isRoot, t]);

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
