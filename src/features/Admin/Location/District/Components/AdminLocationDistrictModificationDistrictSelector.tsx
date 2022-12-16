import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HookFormControl } from '@interfaces/Common/commonTypes';
import { SelectOptionItemType } from '@interfaces/Common/elementTypes';
import { locationService } from '@services/index';

import { Select } from '@components/Form';

interface AdminLocationDistrictModificationDistrictSelectorProps {
  control: HookFormControl;
  disabled?: boolean;
  provinceId: number | null;
}

const AdminLocationDistrictModificationDistrictSelector = ({
  control,
  disabled,
  provinceId,
}: AdminLocationDistrictModificationDistrictSelectorProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.location.district.modal.modification',
  });

  const [locationProvinceOptions, setLocationProvinceOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDistricts = useCallback(() => {
    if (locationProvinceOptions.length === 0) {
      setIsLoading(true);
    }

    if (!provinceId) {
      return;
    }

    locationService
      .getGHNDistricts(provinceId)
      .then((data) => {
        setLocationProvinceOptions(
          data.map((item) => ({
            value: Number(item.id),
            label: String(item.name),
          })),
        );
        setIsLoading(false);
      })
      .catch(() => {
        setLocationProvinceOptions([]);
      });
  }, [locationProvinceOptions, provinceId]);

  useEffect(() => {
    getDistricts();
  }, [provinceId]);

  return (
    <Select
      name="id"
      label={t('form.id.label')}
      placeholder={t('form.id.placeholder')}
      className="block"
      options={locationProvinceOptions}
      isRequired
      control={control}
      disabled={(isLoading || disabled) ?? !provinceId}
    />
  );
};

export default AdminLocationDistrictModificationDistrictSelector;
