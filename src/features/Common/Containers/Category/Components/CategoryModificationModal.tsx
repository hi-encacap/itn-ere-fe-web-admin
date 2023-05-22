import { ICategory } from "@encacap-group/common/dist/re";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRoleSelector } from "@selectors/commonSliceSelectors";
import { omit } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import RootWebsiteSelector from "src/features/Root/Website/Components/RootWebsiteSelector";

import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";
import { ServiceAddFunctionType, ServiceUpdateFunctionType } from "@interfaces/Common/commonTypes";

import { Input } from "@components/Form";
import ImageInput from "@components/Form/ImageInput/ImageInput";
import Modal, { ModalProps } from "@components/Modal/Modal";

import useSelector from "@hooks/useSelector";
import { generateImageFormData } from "@utils/image";

import { categoryFormSchema } from "../Schemas/categoryFormSchema";
import CategoryGroupSelector from "./CategoryGroupSelector";
import ParentCategorySelector from "./CategoryParentSelector";

export interface CategoryModificationModalProps extends ModalProps {
  category: ICategory | null;
  onCreate: ServiceAddFunctionType<CategoryFormDataType>;
  onUpdate: ServiceUpdateFunctionType<CategoryFormDataType>;
}

const CategoryModificationModal = ({
  category,
  onClose,
  onCreate,
  onUpdate,
  ...props
}: CategoryModificationModalProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.category.modal.modification",
  });

  const [isLoading, setIsLoading] = useState(false);

  const role = useSelector(userRoleSelector);

  const defaultValues: CategoryFormDataType = {
    name: "",
    categoryGroupCode: "",
    thumbnail: null,
    parentId: null,
    websiteId: null,
  };

  const {
    control,
    handleSubmit: useFormSubmit,
    reset,
    setValue,
  } = useForm<CategoryFormDataType>({
    resolver: yupResolver(categoryFormSchema(t, role)),
    defaultValues,
  });

  const updateCategory = useCallback(
    (data: CategoryFormDataType) => {
      if (!category) {
        return;
      }

      setIsLoading(true);

      onUpdate(category?.id, data).finally(() => {
        setIsLoading(false);
      });
    },
    [category, onClose],
  );

  const createCategory = useCallback(
    (data: CategoryFormDataType) => {
      setIsLoading(true);

      onCreate(data).finally(() => {
        setIsLoading(false);
      });
    },
    [onCreate, onClose],
  );

  const handleSubmit = useFormSubmit((data) => {
    if (category) {
      updateCategory(data);
      return;
    }
    createCategory(data);
  });

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (category !== null) {
      setValue("name", category.name);
      setValue("categoryGroupCode", category.categoryGroupCode);
      setValue("thumbnail", generateImageFormData(category.thumbnail));
      setValue("parentId", category.parentId);
      setValue("websiteId", category.websiteId);
      return;
    }

    reset();
  }, [category]);

  return (
    <Modal
      title={category ? t("title.edit") : t("title.create")}
      isLoading={isLoading}
      onConfirm={handleSubmit}
      onClose={handleClose}
      {...omit(props, "onSubmit")}
    >
      <form className="grid gap-6" onSubmit={handleSubmit}>
        {role.isRoot && <RootWebsiteSelector control={control} />}
        <Input
          name="name"
          label={t("form.name.label")}
          placeholder={t("form.name.placeholder")}
          className="block"
          autoComplete="off"
          control={control}
        />
        {role.isRoot && <CategoryGroupSelector control={control} />}
        {!role.isRoot && <ParentCategorySelector control={control} onChange={setValue} />}
        <ImageInput name="thumbnail" label={t("form.thumbnail.label")} control={control} />
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default CategoryModificationModal;
