import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { HookFormControl } from "@interfaces/Common/commonTypes";
import { SelectOptionItemType } from "@interfaces/Common/elementTypes";
import { locationService } from "@services/index";
import { Select } from "@components/Form";

interface AdminLocationWardModificationWardSelectorProps {
  control: HookFormControl;
  disabled?: boolean;
  districtCode: string | null;
}

const AdminLocationWardModificationWardSelector = ({
  control,
  disabled,
  districtCode,
}: AdminLocationWardModificationWardSelectorProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.location.ward.modal.modification",
  });

  const [locationProvinceOptions, setLocationProvinceOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDistricts = useCallback(() => {
    if (locationProvinceOptions.length === 0) {
      setIsLoading(true);
    }

    if (!districtCode) {
      return;
    }

    locationService
      .getGHNWards(districtCode)
      .then((data) => {
        setLocationProvinceOptions(
          data.map((item) => ({
            value: Number(item.ghnRefId),
            label: String(item.name),
          })),
        );
        setIsLoading(false);
      })
      .catch(() => {
        setLocationProvinceOptions([]);
      });
  }, [locationProvinceOptions, districtCode]);

  useEffect(() => {
    getDistricts();
  }, [districtCode]);

  return (
    <Select
      name="ghnRefId"
      label={t("form.id.label")}
      placeholder={t("form.id.placeholder")}
      className="block"
      options={locationProvinceOptions}
      isRequired
      control={control}
      disabled={(isLoading || disabled) ?? !districtCode}
    />
  );
};

export default AdminLocationWardModificationWardSelector;
