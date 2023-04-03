import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HookFormControl } from '@interfaces/Common/commonTypes';
import { SelectOptionItemType } from '@interfaces/Common/elementTypes';
import { adminLocationService } from '@services/index';

import { Select } from '@components/Form';

import { commonFormErrorFactory } from '@utils/error';

interface AdminLocationWardSelectorProps {
  control: HookFormControl;
  districtCode?: string | null;
  disabled?: boolean;
}

const AdminLocationWardSelector = ({ control, districtCode, disabled }: AdminLocationWardSelectorProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:form.location.wardCode',
  });

  const [options, setOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
    if (!districtCode) {
      return;
    }

    adminLocationService
      .getWards({
        districtCode,
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
  }, [districtCode]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Select
      name="wardCode"
      label={t('label')}
      placeholder={t('placeholder')}
      className="block"
      options={options}
      isRequired
      control={control}
      disabled={!districtCode ?? isLoading ?? disabled}
      errorFactory={commonFormErrorFactory(t)}
    />
  );
};

export default memo(AdminLocationWardSelector);
