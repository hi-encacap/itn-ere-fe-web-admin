import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Select } from "@components/Form";
import { HookFormControl } from "@interfaces/Common/commonTypes";
import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";
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

  const getProvinces = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await adminLocationService.getAllProvinces();

      setLocationProvinceOptions(
        data.map((item) => ({
          value: String(item.code),
          label: String(item.name),
        })),
      );
    } catch (error) {
      setLocationProvinceOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProvinces();
  }, [getProvinces]);

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
