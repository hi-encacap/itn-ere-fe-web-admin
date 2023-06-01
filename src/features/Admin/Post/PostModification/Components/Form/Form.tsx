import { ESTATE_STATUS_ENUM } from "@encacap-group/common/dist/re";
import { yupResolver } from "@hookform/resolvers/yup";
import { HTMLAttributes, Key, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ADMIN_PATH } from "@constants/urls";
import { PostFormDataType } from "@interfaces/Admin/postTypes";
import { adminPostService } from "@services/index";

import PostPublishingModal from "@components/Post/PublishingModal/PublishingModal";

import useToast from "@hooks/useToast";
import { setFormError } from "@utils/error";

import postFormSchema from "@admin/Post/Schemas/postFormSchema";

import AdminPostModificationFormButtonNew from "./Button/New";
import AdminPostModificationFormDetail from "./Detail/Detail";
import AdminPostModificationFormGeneral from "./General";
import AdminPostModificationPublishingModalFooter from "./PublishingModalFooter";

const AdminPostModificationForm = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PostFormDataType | null>(null);
  const [isShowPublishingModal, setIsShowPublishingModal] = useState(false);

  const { t } = useTranslation();

  const {
    handleSubmit: useFormSubmit,
    getValues,
    setError,
    setFocus,
    ...formProps
  } = useForm<PostFormDataType>({
    resolver: yupResolver(postFormSchema(t)),
    shouldFocusError: true,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleCloseModal = useCallback(() => {
    setIsShowPublishingModal(false);
  }, []);

  const handleSubmit = useFormSubmit(async (data) => {
    setIsSubmitting(true);
    setFormData(data);
    setIsShowPublishingModal(true);
  });

  const handleCreate = useCallback(
    async (data: unknown) => await adminPostService.createPost(data as PostFormDataType),
    [],
  );

  const handleUpdate = useCallback(
    async (id: Key, data: unknown) =>
      await adminPostService.updatePostById(Number(id), data as PostFormDataType),
    [],
  );

  const handleSaveDraft = useCallback(async () => {
    const data = getValues();

    if (!data.title) {
      setError("title", {
        type: "required",
        message: t("titleRequired"),
      });
      setFocus("title");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await adminPostService.createPostDraft(data);
      toast.success(t("saveDraftSuccess"));
      navigate(ADMIN_PATH.POST_MODIFICATION_PATH(response.id, ESTATE_STATUS_ENUM.DRAFT));
    } catch (error) {
      setFormError({
        error,
        setError,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [getValues]);

  return (
    <>
      <div className={twMerge(className, "flex flex-col space-y-6")}>
        <FormProvider
          handleSubmit={useFormSubmit}
          getValues={getValues}
          setError={setError}
          setFocus={setFocus}
          {...formProps}
        >
          <AdminPostModificationFormGeneral />
          <AdminPostModificationFormDetail />
        </FormProvider>
        <div className="flex space-x-6">
          <AdminPostModificationFormButtonNew
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
          />
        </div>
      </div>
      <PostPublishingModal
        data={formData}
        isOpen={isShowPublishingModal}
        footer={<AdminPostModificationPublishingModalFooter />}
        onClose={handleCloseModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onPublish={adminPostService.publishPostById}
      />
    </>
  );
};

export default AdminPostModificationForm;
