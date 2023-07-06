import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Select } from "@components/Form";
import { HookFormControl } from "@interfaces/Common/commonTypes";
import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";
import { commonFormErrorFactory } from "@utils/error";

interface AdminLocationDistrictSelectorProps {
  control: HookFormControl;
  provinceCode?: string | null;
  disabled?: boolean;
}

const AdminLocationDistrictSelector = ({
  control,
  provinceCode,
  disabled,
}: AdminLocationDistrictSelectorProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:form.location.districtCode",
  });

  const [options, setOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
    if (!provinceCode) {
      return;
    }

    if (options.length === 0) {
      setIsLoading(true);
    }

    adminLocationService
      .getDistricts({
        provinceCode,
      })
      .then(({ data }) => {
        setOptions(
          data.map((item) => ({
            value: String(item.code),
            label: String(item.name),
          })),
        );
        setIsLoading(false);
      })
      .catch(() => {
        setOptions([]);
      });
  }, [options.length, provinceCode]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Select
      name="districtCode"
      label={t("label")}
      placeholder={t("placeholder")}
      className="block"
      options={options}
      isRequired
      control={control}
      disabled={!provinceCode || isLoading || disabled}
      errorFactory={commonFormErrorFactory(t)}
    />
  );
};

export default memo(AdminLocationDistrictSelector);
