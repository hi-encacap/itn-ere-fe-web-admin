import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { EstateModificationFormDataType, EstatePropertyDataType } from '@interfaces/Admin/estateTypes';
import { adminEstatePropertyService } from '@services/index';

import { Button, Input } from '@components/Form';

const AdminEstateModificationFormDetailPropertyInputGroup = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification.form.detail.form',
  });

  const [estateProperties, setEstateProperties] = useState<EstatePropertyDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { control, watch } = useFormContext<EstateModificationFormDataType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'properties' as never,
  });

  const categoryId = watch('categoryId');

  const getPropertyByCategoryId = useCallback(() => {
    if (!categoryId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    adminEstatePropertyService
      .getAllEstateProperties({
        categoryId,
      })
      .then((data) => {
        setEstateProperties(data);

        // Dynamic append fields
        remove();
        data.forEach((estateProperty) => {
          append({
            id: estateProperty.id,
            name: estateProperty.name,
            value: '',
          });
        });
      })
      .catch(() => {
        setEstateProperties([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  useEffect(() => {
    getPropertyByCategoryId();
  }, [getPropertyByCategoryId]);

  return (
    <>
      {fields.map((field, index) => (
        <Input
          className="block"
          control={control}
          key={field.id}
          label={estateProperties[index]?.name}
          name={`properties.${index}.value`}
          placeholder={t('property.placeholder', {
            name: estateProperties[index]?.name.toLowerCase(),
          })}
        />
      ))}
      <Button
        className="mx-0.5 mt-[22px] h-[43px]"
        color="primary-light"
        disabled={!categoryId || isLoading}
        isLoading={isLoading}
      >
        {!isLoading && <MdAdd size={22} className="mr-2 flex-shrink-0" />}
        <span className="line-clamp-1">{t('addProperty')}</span>
      </Button>
    </>
  );
};

export default AdminEstateModificationFormDetailPropertyInputGroup;
