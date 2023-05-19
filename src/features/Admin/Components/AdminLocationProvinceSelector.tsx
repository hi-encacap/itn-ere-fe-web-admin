import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { HookFormControl } from "@interfaces/Common/commonTypes";
import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";

import { Select } from "@components/Form";

import { commonFormErrorFactory } from "@utils/error";

interface AdminLocationProvinceSelectorProps {
  control: HookFormControl;
  disabled?: boolean;
}

const AdminLocationProvinceSelector = ({ control, disabled }: AdminLocationProvinceSelectorProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:form.location.provinceCode",
  });

  const [locationProvinceOptions, setLocationProvinceOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProvinces = useCallback(() => {
    if (locationProvinceOptions.length === 0) {
      setIsLoading(true);
    }

    adminLocationService
      .getProvinces()
      .then(({ data }) => {
        setLocationProvinceOptions(
          data.map((item) => ({
            value: String(item.code),
            label: String(item.name),
          })),
        );
        setIsLoading(false);
      })
      .catch(() => {
        setLocationProvinceOptions([]);
      });
  }, [locationProvinceOptions]);

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <Select
      name="provinceCode"
      label={t("label")}
      placeholder={t("placeholder")}
      className="block"
      options={locationProvinceOptions}
      isRequired
      control={control}
      disabled={isLoading || disabled}
      errorFactory={commonFormErrorFactory(t)}
    />
  );
};

export default memo(AdminLocationProvinceSelector);
