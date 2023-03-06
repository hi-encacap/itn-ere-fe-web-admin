import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateModificationFormDataType } from '@interfaces/Admin/estateTypes';
import { adminEstateService } from '@services/index';

import { Button } from '@components/Form';

import useToast from '@hooks/useToast';
import { setFormError } from '@utils/error';

import { estateFormSchema } from '@admin/Estate/Schemas/estateFormSchema';

import AdminEstateModificationFormContact from './Contact/Contact';
import AdminEstateModificationFormDetail from './Detail/Detail';
import AdminEstateModificationFormGeneral from './General/General';
import AdminEstateModificationFormLocation from './Location/Location';
import AdminEstateModificationFormMedia from './Media/Media';

const AdminEstateModificationForm = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification',
  });
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit: useFormSubmit,
    setError,
    setFocus,
    ...formProperties
  } = useForm<EstateModificationFormDataType>({
    resolver: yupResolver(estateFormSchema(t)),
    shouldFocusError: true,
  });

  const formatErrorMessage = useCallback((key: string, value: string) => {
    return t(`form.${key}.${value}`);
  }, []);

  const handleUnknownError = useCallback(() => {
    toast.error(t('toast.error.unknown'));
  }, []);

  const handleSubmit = useFormSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const response = await adminEstateService.createEstate(data);
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        setFormError<EstateModificationFormDataType>(
          error,
          setError,
          formatErrorMessage,
          handleUnknownError,
          setFocus,
        );
        return;
      }

      handleUnknownError();
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="col-span-4">
      <FormProvider
        control={control}
        handleSubmit={useFormSubmit}
        setError={setError}
        setFocus={setFocus}
        {...formProperties}
      >
        <AdminEstateModificationFormGeneral />
        <AdminEstateModificationFormLocation />
        <AdminEstateModificationFormDetail />
        <AdminEstateModificationFormContact />
        <AdminEstateModificationFormMedia />
      </FormProvider>
      <div className="mt-6 flex items-center justify-center space-x-6 border-t-2 border-gray-100 pt-6">
        <Button
          className="block"
          color="light"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="button"
          onClick={handleSubmit}
        >
          {t('form.action.save')}
        </Button>
        <Button
          className="block flex-1"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          onClick={handleSubmit}
        >
          {t('form.action.publish')}
        </Button>
      </div>
    </div>
  );
};

export default AdminEstateModificationForm;
