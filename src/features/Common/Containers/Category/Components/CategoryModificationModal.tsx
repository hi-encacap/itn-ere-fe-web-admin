import { ICategory } from "@encacap-group/common/dist/re";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRoleSelector } from "@selectors/commonSliceSelectors";
import { omit } from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import RootWebsiteSelector from "src/features/Root/Website/Components/RootWebsiteSelector";

import { Input } from "@components/Form";
import ImageInput from "@components/Form/ImageInput/ImageInput";
import Modal, { ModalProps } from "@components/Modal/Modal";
import useSelector from "@hooks/useSelector";
import { CategoryFormDataType } from "@interfaces/Admin/categoryTypes";
import {
  ServiceAddFunctionType,
  ServiceGetAllFunctionType,
  ServiceUpdateFunctionType,
} from "@interfaces/Common/commonTypes";
import { generateImageFormData } from "@utils/image";

import CategorySelector from "../../../Components/Form/Select/CategorySelector/CategorySelector";
import { categoryFormSchema } from "../Schemas/categoryFormSchema";
import CategoryGroupSelector from "./CategoryGroupSelector";

export interface CategoryModificationModalProps extends ModalProps {
  category: ICategory | null;
  onCreate: ServiceAddFunctionType<CategoryFormDataType>;
  onUpdate: ServiceUpdateFunctionType<CategoryFormDataType>;
  onGetAll: ServiceGetAllFunctionType<ICategory>;
}

const CategoryModificationModal = ({
  category,
  onClose,
  onCreate,
  onUpdate,
  onGetAll,
  ...props
}: CategoryModificationModalProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const role = useSelector(userRoleSelector);

  const defaultValues: CategoryFormDataType = {
    name: "",
    categoryGroupCode: "",
    avatar: null,
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
        reset();
      });
    },
    [category, onUpdate, reset],
  );

  const createCategory = useCallback(
    (data: CategoryFormDataType) => {
      setIsLoading(true);

      onCreate(data).finally(() => {
        setIsLoading(false);
        reset();
      });
    },
    [onCreate, reset],
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

  const handleSelectCategory = useCallback(
    (value: ICategory) => {
      setValue("categoryGroupCode", value.categoryGroupCode);
    },
    [setValue],
  );

  useEffect(() => {
    if (category !== null) {
      setValue("name", category.name);
      setValue("categoryGroupCode", category.categoryGroupCode);
      setValue("avatar", generateImageFormData(category.avatar));
      setValue("parentId", category.parent?.id ?? null);
      setValue("websiteId", category.websiteId);
      return;
    }

    reset();
  }, [category, reset, setValue]);

  return (
    <Modal
      title={category ? t("editCategory") : t("addCategory")}
      isLoading={isLoading}
      onConfirm={handleSubmit}
      onClose={handleClose}
      {...omit(props, "onSubmit")}
    >
      <form className="grid gap-6" onSubmit={handleSubmit}>
        {role.isRoot && <RootWebsiteSelector control={control} />}
        <Input
          name="name"
          label={t("name")}
          placeholder={t("enterName")}
          className="block"
          autoComplete="off"
          control={control}
        />
        {role.isRoot && <CategoryGroupSelector control={control} />}
        {!role.isRoot && (
          <CategorySelector
            control={control}
            label={t("parentCategory")}
            name="parentId"
            placeholder={t("selectParentCategory")}
            onGet={onGetAll}
            onSelect={handleSelectCategory}
          />
        )}
        <ImageInput name="avatar" label={t("avatar")} control={control} />
        <button type="submit" className="hidden">
          {t("submit")}
        </button>
      </form>
    </Modal>
  );
};

export default memo(CategoryModificationModal);
