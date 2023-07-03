import { ACB_CONFIG_CODE_ENUM, CONFIG_TYPE_ENUM } from "@encacap-group/common/dist/re";
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
import { configWebsiteHomeHeroFormSchema } from "../../Schemas/configWebsiteFormSchema";

const AdminConfigWebsiteHomeHero = () => {
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
    resolver: yupResolver(configWebsiteHomeHeroFormSchema(t)),
  });

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await adminWebsiteConfigService.getConfigByKey(ACB_CONFIG_CODE_ENUM.HOMEPAGE_HERO_IMAGE);

      setValue(ACB_CONFIG_CODE_ENUM.HOMEPAGE_HERO_IMAGE, generateImagesFormData(res.value));
    } catch (error) {
      toast.error(t("getWebsiteConfigError"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = useFormSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const submitData: FormImageInputDataType[] = data[ACB_CONFIG_CODE_ENUM.HOMEPAGE_HERO_IMAGE];
      await adminWebsiteConfigService.updateWebsiteConfigByKey(ACB_CONFIG_CODE_ENUM.HOMEPAGE_HERO_IMAGE, {
        value: JSON.stringify(submitData.map((item) => item.id)),
        type: CONFIG_TYPE_ENUM.IMAGE_ARRAY,
      });
      toast.success(t("updateConfigWebsiteSuccess"), t("mayTakeAWhileToEffectConfigWebsite"));
    } catch (error) {
      toast.error(t("updateConfigWebsiteError"));
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <AdminConfigWebsiteContainer title={t("homeHero")} subtitle={t("homeHeroSubtitle")}>
      <form className="grid gap-y-6 gap-x-5 lg:grid-cols-2" onSubmit={handleSubmit}>
        <ImageInput
          name={ACB_CONFIG_CODE_ENUM.HOMEPAGE_HERO_IMAGE}
          control={control}
          className="col-span-2"
          disabled={isDisabled}
          isMultiple
          itemContainerClassName="grid-cols-5 xl:grid-cols-8"
          onUploading={setIsUploading}
        />
        <Button
          className="col-span-2 mt-2 w-full"
          disabled={isDisabled}
          isLoading={isSubmitting}
          type="submit"
        >
          {t("update")}
        </Button>
      </form>
    </AdminConfigWebsiteContainer>
  );
};

export default AdminConfigWebsiteHomeHero;
