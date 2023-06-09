import { DEFAULT_CLOUDFLARE_VARIANT_ENUM, ESTATE_STATUS_ENUM, IPost } from "@encacap-group/common/dist/re";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { HTMLAttributes, Key, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import {
  PostModificationFormButtonDraft,
  PostModificationFormButtonNew,
  PostModificationFormButtonPublished,
  PostModificationFormButtonUnPublished,
} from "@components/Post";
import PostPublishingModal from "@components/Post/PublishingModal/PublishingModal";
import { ADMIN_PATH } from "@constants/urls";
import useToast from "@hooks/useToast";
import { PostDraftDataType, PostFormDataType } from "@interfaces/Admin/postTypes";
import { adminPostService } from "@services/index";
import { setFormError } from "@utils/error";
import { generateImageFormData } from "@utils/image";

import postFormSchema from "@admin/Post/Schemas/postFormSchema";

import AdminPostModificationFormDetail from "./Detail/Detail";
import AdminPostModificationFormGeneral from "./General";
import AdminPostModificationPublishingModalFooter from "./PublishingModalFooter";

const AdminPostModificationForm = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<PostFormDataType | null>(null);
  const [isShowPublishingModal, setIsShowPublishingModal] = useState(false);
  const [searchParams] = useSearchParams();

  const postIdParam = useMemo(() => searchParams.get("post_id"), [searchParams]);
  const postStatusParam = useMemo(
    () => (searchParams.get("post_status") as ESTATE_STATUS_ENUM) ?? undefined,
    [searchParams],
  );
  const isDisabled = useMemo(() => isSubmitting || isLoading, [isSubmitting, isLoading]);

  const {
    handleSubmit: useFormSubmit,
    getValues,
    setError,
    setFocus,
    setValue,
    reset,
    ...formProps
  } = useForm<PostFormDataType>({
    resolver: yupResolver(postFormSchema(t)),
    shouldFocusError: true,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const setFormValue = useCallback(
    (data: IPost | PostDraftDataType) => {
      setValue("id", data.id);
      setValue("title", data.title);
      setValue("categoryId", data.category?.id ?? null);
      setValue("content", data.content);
      setValue("status", data.status);

      if (data.avatar) {
        setValue("avatar", generateImageFormData(data.avatar, DEFAULT_CLOUDFLARE_VARIANT_ENUM.SMALL));
      }
    },
    [setValue],
  );

  const mapErrorFieldToFormField = useCallback((errorField: string) => {
    if (errorField === "imageIds") {
      return "images";
    }

    return errorField;
  }, []);

  const getData = useCallback(async () => {
    if (!postIdParam) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      let data: PostDraftDataType | IPost | null = null;

      if (postStatusParam === ESTATE_STATUS_ENUM.DRAFT) {
        data = await adminPostService.getPostDraftById(Number(postIdParam));
      } else {
        data = await adminPostService.getPostById(Number(postIdParam));
      }

      if (!data) {
        throw new Error();
      }

      setFormValue(data);
    } catch (error) {
      toast.error(t("getPostError"));
    } finally {
      setIsLoading(false);
    }
  }, [postIdParam, postStatusParam, setFormValue]);

  const handleCloseModal = useCallback(() => {
    setIsShowPublishingModal(false);
  }, []);

  const handleSaveAndPublish = useFormSubmit((data) => {
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
      let response: PostDraftDataType | null = null;

      if (!data.id) {
        response = await adminPostService.createPostDraft(data);
      } else {
        response = await adminPostService.updatePostDraftById(data.id, data);
      }

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

  const handleUpdatePost = useFormSubmit(async (data) => {
    if (!data.id) {
      return;
    }

    setIsSubmitting(true);

    try {
      await adminPostService.updatePostById(data.id, data);

      toast.success(t("editPostSuccess"));

      navigate(ADMIN_PATH.POST_EDIT_PATH(data.id, data.status as ESTATE_STATUS_ENUM));
    } catch (error) {
      toast.error(t("editPostError"));

      if (error instanceof AxiosError) {
        setFormError({ error, setError, getField: mapErrorFieldToFormField });
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <>
      <form
        className={twMerge(className, "relative flex flex-col space-y-6")}
        onSubmit={handleSaveAndPublish}
      >
        <FormProvider
          handleSubmit={useFormSubmit}
          getValues={getValues}
          setError={setError}
          reset={reset}
          setValue={setValue}
          setFocus={setFocus}
          {...formProps}
        >
          <AdminPostModificationFormGeneral isEditMode={Boolean(postIdParam)} />
          <AdminPostModificationFormDetail />
        </FormProvider>
        {isDisabled && <div className="absolute -inset-6 z-10 bg-white opacity-50" />}
        <div className="mt-6 flex space-x-6">
          {!postIdParam && (
            <PostModificationFormButtonNew
              isSubmitting={isSubmitting}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSaveAndPublish}
            />
          )}
          {postIdParam && postStatusParam === ESTATE_STATUS_ENUM.UNPUBLISHED && (
            <PostModificationFormButtonUnPublished
              isSubmitting={isSubmitting}
              onSubmit={handleUpdatePost}
              onSaveAndPublish={handleSaveAndPublish}
            />
          )}
          {postIdParam && postStatusParam === ESTATE_STATUS_ENUM.DRAFT && (
            <PostModificationFormButtonDraft
              isSubmitting={isSubmitting}
              onSubmit={handleSaveDraft}
              onSaveAndPublish={handleSaveAndPublish}
            />
          )}
          {postIdParam && postStatusParam === ESTATE_STATUS_ENUM.PUBLISHED && (
            <PostModificationFormButtonPublished isSubmitting={isSubmitting} onSubmit={handleUpdatePost} />
          )}
        </div>
      </form>
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
