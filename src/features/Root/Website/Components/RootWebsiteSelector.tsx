import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { rootWebsiteService } from "@services/index";
import { Select } from "@components/Form";
import { SelectProps } from "@components/Form/Select/Select";

const RootWebsiteSelector = ({
  ...props
}: Omit<SelectProps, "options" | "name" | "label" | "placeholder">) => {
  const { t } = useTranslation();

  const [websiteOptions, setWebsiteOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOptions = useCallback(() => {
    setIsLoading(true);

    rootWebsiteService
      .getAllWebsites()
      .then((categoryGroups) => {
        const options = categoryGroups.map((categoryGroup) => ({
          value: categoryGroup.id,
          label: categoryGroup.name,
        }));

        setWebsiteOptions(options);
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
      name="websiteId"
      label={t("website")}
      placeholder={t("selectWebsite")}
      className="block"
      options={websiteOptions}
      disabled={isLoading}
      {...props}
    />
  );
};

export default RootWebsiteSelector;
