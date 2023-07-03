import { ACB_CONFIG_CODE_ENUM, CONFIG_TYPE_ENUM, IWebsiteConfig } from "@encacap-group/common/dist/re";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";
import ImageInput from "@components/Form/ImageInput/ImageInput";
import useToast from "@hooks/useToast";
import { FormImageInputDataType } from "@interfaces/Common/elementTypes";
import { adminWebsiteConfigService } from "@services/index";
import { generateImagesFormData } from "@utils/image";

import AdminConfigWebsiteContainer from "../../Components/AdminConfigWebsiteContainer";
import AdminConfigWebsitePostInput from "../../Components/AdminConfigWebsitePostInput";
import { configWebsiteHomeIntroduceFormSchema } from "../../Schemas/configWebsiteFormSchema";

const AdminConfigWebsiteHomeIntroduce = () => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const isDisabled = useMemo(
    () => isSubmitting || isUploading || isLoading,
    [isSubmitting, isUploading, isLoading],
  );
  const {
    control,
    handleSubmit: useFormSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(configWebsiteHomeIntroduceFormSchema(t)),
  });

  const handleSubmit = useFormSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const imageIds: FormImageInputDataType[] = data[ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE]?.map(
        (item: FormImageInputDataType) => item.id,
      );
      const postId: number = data[ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_POST];
      await adminWebsiteConfigService.bulkUpdateWebsiteConfig([
        {
          code: ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE,
          value: JSON.stringify(imageIds),
          type: CONFIG_TYPE_ENUM.IMAGE_ARRAY,
        },
        {
          code: ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_POST,
          value: postId.toString(),
          type: CONFIG_TYPE_ENUM.POST,
        },
      ]);
      toast.success(t("updateConfigWebsiteSuccess"), t("mayTakeAWhileToEffectConfigWebsite"));
      console.log(imageIds, postId);
    } catch (error) {
      toast.error(t("updateConfigWebsiteError"));
    } finally {
      setIsSubmitting(false);
    }
  });

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await adminWebsiteConfigService.getConfigs({
        codes: [ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE, ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_POST],
      });

      const imageConfig = data.find(
        (item: IWebsiteConfig) => item.code === ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE,
      );

      if (imageConfig) {
        setValue(ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE, generateImagesFormData(imageConfig.value));
      }

      const postConfig = data.find(
        (item: IWebsiteConfig) => item.code === ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_POST,
      );

      if (postConfig) {
        setValue(ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_POST, Number(postConfig.value));
      }
    } catch (error) {
      toast.error(t("getWebsiteConfigError"));
    } finally {
      setIsLoading(false);
    }
  }, [toast, t]);

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <AdminConfigWebsiteContainer title={t("homeIntroduce")} subtitle={t("homeIntroduceSubtitle")}>
      <form className="grid gap-y-6 gap-x-5" onSubmit={handleSubmit}>
        <ImageInput
          name={ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE}
          control={control}
          disabled={isDisabled}
          isMultiple
          isRequired
          itemContainerClassName="grid-cols-5 xl:grid-cols-8"
          label={t("image")}
          onUploading={setIsUploading}
        />
        <AdminConfigWebsitePostInput
          name={ACB_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_POST}
          control={control}
          isDisabled={isDisabled}
        />
        <Button className="mt-2 w-full" disabled={isDisabled} isLoading={isSubmitting} type="submit">
          {t("update")}
        </Button>
      </form>
    </AdminConfigWebsiteContainer>
  );
};

export default AdminConfigWebsiteHomeIntroduce;
