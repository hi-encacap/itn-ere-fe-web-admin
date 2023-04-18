import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ADMIN_PATH } from '@constants/urls';
import { EstateFormDataType } from '@interfaces/Admin/estateTypes';
import { adminEstateService } from '@services/index';

import { Button } from '@components/Form';

import useToast from '@hooks/useToast';

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
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EstateFormDataType | null>(null);
  const [isShowPublishingModal, setIsShowPublishingModal] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit: useFormSubmit,
    setError,
    setFocus,
    getValues,
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

  const handleSaveDraft = useCallback(async () => {
    const data = getValues();
    const { title } = data;

    if (!title) {
      setError('title', {
        type: 'required',
        message: t('form.general.form.title.requiredInDraft'),
      });
      setFocus('title');

      return;
    }

    setIsSubmitting(true);

    try {
      const { id } = await adminEstateService.createEstateDraft(data);

      toast.success(t('notification.savedDraft'));

      navigate(ADMIN_PATH.ESTATE_MODIFICATION_PATH(id, ESTATE_STATUS_ENUM.DRAFT));
    } catch (error) {
      toast.error(t('notification.saveDraftFailed'));
    } finally {
      setIsSubmitting(false);
    }
  }, [getValues]);

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
          getValues={getValues}
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
            onClick={handleSaveDraft}
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
