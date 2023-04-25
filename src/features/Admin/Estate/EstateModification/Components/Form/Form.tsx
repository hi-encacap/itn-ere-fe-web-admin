import { DEFAULT_CLOUDFLARE_VARIANT_ENUM, ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ADMIN_PATH } from '@constants/urls';
import { EstateFormDataType } from '@interfaces/Admin/estateTypes';
import { adminEstateService } from '@services/index';

import useToast from '@hooks/useToast';
import { setFormError } from '@utils/error';
import { generateImageFormData, generateImagesFormData } from '@utils/image';

import { estateFormSchema } from '@admin/Estate/Schemas/estateFormSchema';

import AdminEstateModificationPublishingModal from '../PublishingModal/PublishingModal';
import AdminEstateModificationFormButtonNew from './Button/New';
import AdminEstateModificationFormButtonUnPublished from './Button/UnPublished';
import AdminEstateModificationFormContact from './Contact/Contact';
import AdminEstateModificationFormDetail from './Detail/Detail';
import AdminEstateModificationFormGeneral from './General/General';
import AdminEstateModificationFormLocation from './Location/Location';
import AdminEstateModificationFormMedia from './Media/Media';

interface AdminEstateModificationFormProps {
  id?: number;
}

const AdminEstateModificationForm = ({ id }: AdminEstateModificationFormProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification',
  });
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EstateFormDataType | null>(null);
  const [isShowPublishingModal, setIsShowPublishingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [estateStatus, setEstateStatus] = useState<ESTATE_STATUS_ENUM | null>(null);

  const isDisabled = useMemo(() => isSubmitting || isLoading, [isSubmitting, isLoading]);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit: useFormSubmit,
    setError,
    setFocus,
    setValue,
    getValues,
    ...formProperties
  } = useForm<EstateFormDataType>({
    resolver: yupResolver(estateFormSchema(t)),
    shouldFocusError: true,
  });

  const getData = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await adminEstateService.getEstateById(id);

      setValue('id', data.id);
      setValue('title', data.title);
      setValue('customId', data.customId);
      setValue('price', data.price);
      setValue('priceUnitId', data.priceUnit.id);
      setValue('area', data.area);
      setValue('areaUnitId', data.areaUnit.id);
      setValue('provinceCode', data.province.code);
      setValue('districtCode', data.district.code);
      setValue('wardCode', data.ward?.code ?? '');
      setValue('address', data.address);
      setValue('addressNote', data.addressNote);
      setValue('categoryId', data.category.id);
      setValue('quarterCode', data.quarter?.code ?? '');
      setValue('description', data.description);
      setValue('contactId', data.contact.id);
      setValue('youtubeId', data.youtubeId);
      setValue('avatar', generateImageFormData(data.avatar, DEFAULT_CLOUDFLARE_VARIANT_ENUM.SMALL));
      setValue('images', generateImagesFormData(data.images, DEFAULT_CLOUDFLARE_VARIANT_ENUM.SMALL));

      setEstateStatus(data.status);

      setIsLoading(false);
    } catch (error) {
      toast.error(t('notification.getEstateFailed'));
    }
  }, [id, toast, t]);

  const handleSubmit = useFormSubmit((data) => {
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

  const mapErrorFieldToFormField = useCallback((errorField: string) => {
    if (errorField === 'imageIds') {
      return 'images';
    }

    return errorField;
  }, []);

  const handleUpdateEstate = useFormSubmit(async (data) => {
    if (!data.id) {
      return;
    }

    setIsSubmitting(true);

    try {
      await adminEstateService.updateEstateById(data.id, data);

      toast.success(t('notification.updatedEstate'));

      navigate(ADMIN_PATH.ESTATE_MODIFICATION_PATH(data.id, data.status as ESTATE_STATUS_ENUM));
    } catch (error) {
      toast.error(t('notification.updateEstateFailed'));

      if (error instanceof AxiosError) {
        setFormError({ error, setError, getField: mapErrorFieldToFormField });
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleSaveAndPublish = useFormSubmit(async (data) => {
    setFormData(data);
    setIsShowPublishingModal(true);
    setIsSubmitting(true);
  });

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <>
      <div className="relative col-span-4">
        {isDisabled && <div className="absolute -inset-6 bg-white opacity-50" />}
        <FormProvider
          control={control}
          getValues={getValues}
          handleSubmit={useFormSubmit}
          setError={setError}
          setFocus={setFocus}
          setValue={setValue}
          {...formProperties}
        >
          <AdminEstateModificationFormGeneral />
          <AdminEstateModificationFormLocation />
          <AdminEstateModificationFormDetail />
          <AdminEstateModificationFormContact />
          <AdminEstateModificationFormMedia />
        </FormProvider>
        <div className="mt-6 flex items-center justify-center space-x-6 border-t-2 border-gray-100 pt-6">
          {!id && (
            <AdminEstateModificationFormButtonNew
              isSubmitting={isSubmitting}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
            />
          )}
          {id && estateStatus === ESTATE_STATUS_ENUM.UNPUBLISHED && (
            <AdminEstateModificationFormButtonUnPublished
              isSubmitting={isSubmitting}
              onSubmit={handleUpdateEstate}
              onSaveAndPublish={handleSaveAndPublish}
            />
          )}
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
