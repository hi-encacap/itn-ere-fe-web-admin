import {
  CONFIG_CODE_ENUM,
  ICloudflareImageResponse,
  IConfig,
  WEBSITE_DOMAIN_ENUM,
} from "@encacap-group/common/dist/re";
import { Key, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

import ImageInput from "@components/Form/ImageInput/ImageInput";

import useSelector from "@hooks/useSelector";
import { generateImagesFormData } from "@utils/image";

import SiteConfigBlockContainer from "./BlockContainer";

interface SiteConfigHomeSliderProps {
  data: IConfig;
  onChange: (code: Key, value: string) => Promise<void> | undefined;
}

const SiteConfigHomeSlider = ({ data, onChange }: SiteConfigHomeSliderProps) => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector((state) => state.common.user);

  const supportedWebsite = useMemo(
    () => [WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV, WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV],
    [],
  );

  const handleChangeImage = useCallback(async (images: FormImageInputDataType[]) => {
    setIsSubmitting(true);

    await onChange(CONFIG_CODE_ENUM.HOMEPAGE_SLIDER_IMAGES, JSON.stringify(images.map((item) => item.id)));

    setIsSubmitting(false);
  }, []);

  if (!supportedWebsite.includes(user?.website.url as WEBSITE_DOMAIN_ENUM)) {
    return null;
  }

  return (
    <SiteConfigBlockContainer
      title={t("homeSliderImage")}
      subtitle={t("homeSliderImageDescription")}
      isLoading={isSubmitting}
    >
      <div className="relative">
        <ImageInput
          name="homeSlider"
          className="grid-cols-4 xl:grid-cols-5"
          isMultiple
          value={generateImagesFormData(data.value as unknown as ICloudflareImageResponse[])}
          onChange={handleChangeImage}
        />
      </div>
    </SiteConfigBlockContainer>
  );
};

export default SiteConfigHomeSlider;
