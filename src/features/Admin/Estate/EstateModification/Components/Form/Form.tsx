import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateFormDataType } from '@interfaces/Admin/estateTypes';

import { Button } from '@components/Form';

import { estateFormSchema } from '@admin/Estate/Schemas/estateFormSchema';

import AdminEstateModificationPublishingModal from '../PublishingModal/PublishingModal';
import AdminEstateModificationFormContact from './Contact/Contact';
import AdminEstateModificationFormDetail from './Detail/Detail';
import AdminEstateModificationFormGeneral from './General/General';
import AdminEstateModificationFormLocation from './Location/Location';
import AdminEstateModificationFormMedia from './Media/Media';

const AdminEstateModificationForm = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EstateFormDataType | null>(null);
  const [isShowPublishingModal, setIsShowPublishingModal] = useState(false);

  const {
    control,
    handleSubmit: useFormSubmit,
    setError,
    setFocus,
    ...formProperties
  } = useForm<EstateFormDataType>({
    resolver: yupResolver(estateFormSchema(t)),
    shouldFocusError: true,
  });

  const handleSubmit = useFormSubmit(async (data) => {
    setFormData(data);
    setIsShowPublishingModal(true);
    setIsSubmitting(true);
  });

  const handleCloseModal = useCallback(() => {
    setIsShowPublishingModal(false);
    setIsSubmitting(false);
  }, []);

  return (
    <>
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
      <AdminEstateModificationPublishingModal
        isOpen={isShowPublishingModal}
        data={formData as EstateFormDataType}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AdminEstateModificationForm;
