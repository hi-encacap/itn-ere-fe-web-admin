import { IAxiosError, IBaseListQuery } from "@encacap-group/common/dist/base";
import { CATEGORY_GROUP_ENUM, IEstateProperty } from "@encacap-group/common/dist/re";
import { yupResolver } from "@hookform/resolvers/yup";
import { keys, omit, pick } from "lodash";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CategorySelector, Input } from "@components/Form";
import Modal, { ModalProps } from "@components/Modal/Modal";
import useToast from "@hooks/useToast";
import { EstatePropertyFormDataType } from "@interfaces/Admin/estateTypes";
import { adminCategoryService, adminEstatePropertyService } from "@services/index";
import { formatErrorMessage, setFormError } from "@utils/error";

import { estatePropertyFormSchema } from "@admin/Estate/Schemas/estatePropertyFormSchema";

interface ComponentProps extends Omit<ModalProps, "id"> {
  estateProperty?: IEstateProperty;
  onCreated: () => void;
}

const AdminEstatePropertyModificationModal = ({
  estateProperty,
  onCreated,
  onClose,
  ...props
}: ComponentProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const defaultValues: EstatePropertyFormDataType = useMemo(
    () => ({
      name: "",
      categoryId: null,
    }),
    [],
  );

  const {
    handleSubmit: useFormSubmit,
    control,
    reset,
    setError,
  } = useForm<EstatePropertyFormDataType>({
    defaultValues,
    resolver: yupResolver(estatePropertyFormSchema(t)),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
    reset(defaultValues);
  }, [onClose, reset, defaultValues]);

  const handleCreate = useCallback(
    (data: EstatePropertyFormDataType) => {
      adminEstatePropertyService
        .createEstateProperty(data)
        .then(() => {
          toast.success(t("addEstatePropertySuccess"));
          onCreated();
          handleClose();
        })
        .catch((error: IAxiosError) => {
          setFormError({ error, setError, formatMessage: formatErrorMessage(t) });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [handleClose, onCreated, setError, t, toast],
  );

  const handleUpdate = useCallback(
    (data: EstatePropertyFormDataType) => {
      adminEstatePropertyService
        .updateEstateProperty(estateProperty?.id as number, data)
        .then(() => {
          toast.success(t("editEstatePropertySuccess"));
          onCreated();
          handleClose();
        })
        .catch((error: IAxiosError) => {
          setFormError({ error, setError, formatMessage: formatErrorMessage(t) });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [estateProperty?.id, handleClose, onCreated, setError, t, toast],
  );

  const handleSubmit = useFormSubmit((data) => {
    setIsSubmitting(true);
    if (!estateProperty) {
      handleCreate(data);
      return;
    }
    handleUpdate(data);
  });

  const getCategories = useCallback((query?: IBaseListQuery) => {
    return adminCategoryService.getAllCategories({
      ...query,
      categoryGroupCodes: [CATEGORY_GROUP_ENUM.ESTATE],
      expands: [...(query?.expands ?? []), "categoryGroup"],
    });
  }, []);

  useEffect(() => {
    if (estateProperty) {
      reset(pick(estateProperty, keys(defaultValues)));
    } else {
      reset(defaultValues);
    }
  }, [defaultValues, estateProperty, reset]);

  return (
    <Modal
      title={estateProperty ? t("editEstateProperty") : t("addEstateProperty")}
      isLoading={isSubmitting}
      onConfirm={handleSubmit}
      onClose={handleClose}
      {...omit(props, "onSubmit")}
    >
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <CategorySelector
          label={t("category")}
          name="categoryId"
          placeholder={t("selectCategory")}
          control={control}
          disabled={isSubmitting}
          onGet={getCategories}
        />
        <Input
          name="name"
          control={control}
          label={t("name")}
          placeholder={t("enterName")}
          className="block"
          isRequired
          disabled={isSubmitting}
        />
      </form>
    </Modal>
  );
};

export default memo(AdminEstatePropertyModificationModal);
