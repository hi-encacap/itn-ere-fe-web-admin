import { ESTATE_STATUS_ENUM, IEstate, IMAGE_VARIANT_ENUM } from "@encacap-group/common/dist/re";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  PostModificationFormButtonDraft,
  PostModificationFormButtonNew,
  PostModificationFormButtonPublished,
  PostModificationFormButtonUnPublished,
} from "@components/Post";
import { ADMIN_PATH } from "@constants/urls";
import useToast from "@hooks/useToast";
import { EstateDraftDataType, EstateFormDataType } from "@interfaces/Admin/estateTypes";
import { adminEstateService } from "@services/index";
import { setFormError } from "@utils/error";
import { generateImageFormData, generateImagesFormData } from "@utils/image";

import { estateFormSchema } from "@admin/Estate/Schemas/estateFormSchema";

import PostPublishingModal from "../../../../../Common/Components/Post/PublishingModal/PublishingModal";
import AdminEstateModificationFormContact from "./Contact/Contact";
import AdminEstateModificationFormDetail from "./Detail/Detail";
import AdminEstateModificationFormGeneral from "./General/General";
import AdminEstateModificationFormLocation from "./Location/Location";
import AdminEstateModificationFormMedia from "./Media/Media";
import AdminEstateModificationPublishingModalFooter from "./PublishingModalFooter";

interface AdminEstateModificationFormProps {
  id?: number;
}

const AdminEstateModificationForm = ({ id }: AdminEstateModificationFormProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification",
  });
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EstateFormDataType | null>(null);
  const [isShowPublishingModal, setIsShowPublishingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [estateStatus, setEstateStatus] = useState<ESTATE_STATUS_ENUM | null>(null);
  const [searchParams] = useSearchParams();

  const statusParam: ESTATE_STATUS_ENUM = useMemo(
    () => (searchParams.get("status") as ESTATE_STATUS_ENUM) ?? ESTATE_STATUS_ENUM.DRAFT,
    [searchParams],
  );
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

  const setFormValue = useCallback(
    (data: IEstate | EstateDraftDataType) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      setValue("id", data.id);
      setValue("title", data.title);
      setValue("customId", data.customId);
      setValue("price", data.price);
      setValue("priceUnitId", data.priceUnit?.id ?? null);
      setValue("area", data.area);
      setValue("areaUnitId", data.areaUnit?.id ?? null);
      setValue("provinceCode", data.province?.code ?? "");
      setValue("districtCode", data.district?.code ?? "");
      setValue("wardCode", data.ward?.code ?? "");
      setValue("address", data.address);
      setValue("addressNote", data.addressNote);
      setValue("categoryId", data.category?.id ?? null);
      setValue("quarterCode", data.quarter?.code ?? "");
      setValue("description", data.description);
      setValue("contactId", data.contact?.id ?? null);
      setValue("youtubeId", data.youtubeId);
      setValue("status", data.status);

      if (data.avatar) {
        setValue("avatar", generateImageFormData(data.avatar, IMAGE_VARIANT_ENUM.SMALL));
      }

      if (data.images) {
        setValue("images", generateImagesFormData(data.images, IMAGE_VARIANT_ENUM.SMALL));
      }
    },
    [setValue],
  );

  const getData = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await adminEstateService.getEstateById(id);

      setFormValue(data);
      setEstateStatus(data.status);
      setIsLoading(false);
    } catch (error) {
      toast.error(t("notification.getEstateFailed"));
    }
  }, [id, toast, t]);

  const getDraftData = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await adminEstateService.getEstateDraftById(id);

      setFormValue(data);
      setEstateStatus(data.status);
      setIsLoading(false);
    } catch (error) {
      toast.error(t("notification.getEstateFailed"));
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
      setError("title", {
        type: "required",
        message: t("form.general.form.title.requiredInDraft"),
      });
      setFocus("title");

      return;
    }

    setIsSubmitting(true);

    try {
      const { id: estateDraftId } = data;

      if (estateDraftId) {
        await adminEstateService.updateEstateDraftById(estateDraftId, data);
        toast.success(t("notification.savedDraft"));
        return;
      }

      const { id } = await adminEstateService.createEstateDraft(data);
      toast.success(t("notification.savedDraft"));
      navigate(ADMIN_PATH.ESTATE_MODIFICATION_PATH(id, ESTATE_STATUS_ENUM.DRAFT));
    } catch (error) {
      toast.error(t("notification.saveDraftFailed"));
    } finally {
      setIsSubmitting(false);
    }
  }, [getValues]);

  const handleCloseModal = useCallback(() => {
    setIsShowPublishingModal(false);
    setIsSubmitting(false);
  }, []);

  const mapErrorFieldToFormField = useCallback((errorField: string) => {
    if (errorField === "imageIds") {
      return "images";
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

      toast.success(t("notification.updatedEstate"));

      navigate(ADMIN_PATH.ESTATE_MODIFICATION_PATH(data.id, data.status as ESTATE_STATUS_ENUM));
    } catch (error) {
      toast.error(t("notification.updateEstateFailed"));

      if (error instanceof AxiosError) {
        setFormError({ error, setError, getField: mapErrorFieldToFormField });
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleSaveAndPublish = useFormSubmit((data) => {
    setFormData(data);
    setIsShowPublishingModal(true);
    setIsSubmitting(true);
  });

  useEffect(() => {
    if (!statusParam) {
      return;
    }

    if (statusParam === ESTATE_STATUS_ENUM.DRAFT) {
      void getDraftData();
      return;
    }

    void getData();
  }, [statusParam, getData, getDraftData]);

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
            <PostModificationFormButtonNew
              isSubmitting={isSubmitting}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
            />
          )}
          {id && estateStatus === ESTATE_STATUS_ENUM.UNPUBLISHED && (
            <PostModificationFormButtonUnPublished
              isSubmitting={isSubmitting}
              onSubmit={handleUpdateEstate}
              onSaveAndPublish={handleSaveAndPublish}
            />
          )}
          {id && estateStatus === ESTATE_STATUS_ENUM.DRAFT && (
            <PostModificationFormButtonDraft
              isSubmitting={isSubmitting}
              onSubmit={handleSaveDraft}
              onSaveAndPublish={handleSaveAndPublish}
            />
          )}
          {id && estateStatus === ESTATE_STATUS_ENUM.PUBLISHED && (
            <PostModificationFormButtonPublished isSubmitting={isSubmitting} onSubmit={handleUpdateEstate} />
          )}
        </div>
      </div>
      <PostPublishingModal
        isOpen={isShowPublishingModal}
        data={formData as EstateFormDataType}
        footer={<AdminEstateModificationPublishingModalFooter />}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AdminEstateModificationForm;
