import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SelectOptionItemType } from '@interfaces/Common/elementTypes';
import { adminCategoryGroupService } from '@services/index';

import { Select } from '@components/Form';
import { SelectProps } from '@components/Form/Select/Select';

const AdminCategoryGroupSelector = ({
  ...props
}: Omit<SelectProps, 'options' | 'name' | 'label' | 'placeholder'>) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.category.modal.modification',
  });

  const [categoryGroupOptions, setCategoryGroupOptions] = useState<SelectOptionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOptions = useCallback(() => {
    setIsLoading(true);

    adminCategoryGroupService
      .getCategoryGroups()
      .then((categoryGroups) => {
        const options = categoryGroups.map((categoryGroup) => ({
          value: categoryGroup.code,
          label: t(`form.categoryGroupName.${categoryGroup.code}`),
        }));

        setCategoryGroupOptions(options);
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
      name="categoryGroupCode"
      label={t('form.categoryGroupCode.label')}
      placeholder={t('form.categoryGroupCode.placeholder')}
      className="block"
      options={categoryGroupOptions}
      disabled={isLoading}
      {...props}
    />
  );
};

export default AdminCategoryGroupSelector;
