import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HookFormControl } from '@interfaces/Common/commonTypes';
import { SelectOptionItemType } from '@interfaces/Common/elementTypes';
import { adminLocationService } from '@services/index';

import { Select } from '@components/Form';

interface AdminLocationModificationProvinceSelectorProps {
  control: HookFormControl;
  disabled?: boolean;
}

const AdminLocationModificationProvinceSelector = ({
  control,
  disabled,
}: AdminLocationModificationProvinceSelectorProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.location.modal.modification',
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
            value: Number(item.province.ghnRefId),
            label: String(item.province.name),
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
  }, [getProvinces]);

  return (
    <Select
      name="provinceId"
      label={t('form.provinceId.label')}
      placeholder={t('form.provinceId.placeholder')}
      className="block"
      options={locationProvinceOptions}
      isRequired
      control={control}
      disabled={isLoading || disabled}
    />
  );
};

export default AdminLocationModificationProvinceSelector;
