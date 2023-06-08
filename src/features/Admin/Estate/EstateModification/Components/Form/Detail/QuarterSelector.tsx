import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EstateFormDataType } from "@interfaces/Admin/estateTypes";
import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { estateQuarterService } from "@services/index";
import { Select } from "@components/Form";

interface AdminEstateModificationFormDetailQuarterSelectProps {
  disabled?: boolean;
}

const AdminEstateModificationFormDetailQuarterSelector = ({
  disabled,
}: AdminEstateModificationFormDetailQuarterSelectProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.form.detail.form.quarter",
  });

  const [options, setOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { control } = useFormContext<EstateFormDataType>();

  const getOptions = useCallback(() => {
    setIsLoading(true);

    estateQuarterService
      .getEstateQuarters()
      .then((data) => {
        setOptions(
          data.map((item) => ({
            value: item.code,
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
      className="block"
      control={control}
      disabled={disabled ?? isLoading}
      name="quarterCode"
      label={t("label")}
      options={options}
      placeholder={t("placeholder")}
    />
  );
};

export default AdminEstateModificationFormDetailQuarterSelector;
