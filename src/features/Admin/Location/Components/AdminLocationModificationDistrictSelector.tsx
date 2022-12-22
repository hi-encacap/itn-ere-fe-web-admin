import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HookFormControl } from '@interfaces/Common/commonTypes';
import { SelectOptionItemType } from '@interfaces/Common/elementTypes';
import { adminLocationService } from '@services/index';

import { Select } from '@components/Form';

interface AdminLocationModificationDistrictSelectorProps {
  control: HookFormControl;
  provinceCode: string;
  disabled?: boolean;
}

const AdminLocationModificationDistrictSelector = ({
  control,
  provinceCode,
  disabled,
}: AdminLocationModificationDistrictSelectorProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.location.modal.modification',
  });

  const [options, setOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
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
  }, [options, provinceCode]);

  useEffect(() => {
    if (!provinceCode) {
      return;
    }
    getData();
  }, [provinceCode]);

  return (
    <Select
      name="districtCode"
      label={t('form.districtCode.label')}
      placeholder={t('form.districtCode.placeholder')}
      className="block"
      options={options}
      isRequired
      control={control}
      disabled={!provinceCode ?? isLoading ?? disabled}
    />
  );
};

export default memo(AdminLocationModificationDistrictSelector);
