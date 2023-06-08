import {
  ACBUILDING_SITE_CONFIG_CODE_ENUM,
  CONFIG_GROUP_ENUM,
  CONFIG_TYPE_ENUM,
  ICloudflareImageResponse,
  IConfig,
  WEBSITE_DOMAIN_ENUM,
} from "@encacap-group/common/dist/re";
import { Key, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";
import ImageInput from "@components/Form/ImageInput/ImageInput";
import { FormImageInputDataType } from "@interfaces/Common/elementTypes";
import { generateImagesFormData } from "@utils/image";

import SiteConfigBlockContainer from "./BlockContainer";

interface SiteConfigHomeIntroduceImageProps {
  data?: IConfig;
  onChange: (code: Key, data: Omit<Partial<IConfig>, "code">) => Promise<void> | undefined;
}

const SiteConfigHomeIntroduceImage = ({ data, onChange }: SiteConfigHomeIntroduceImageProps) => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [imageData, setImageData] = useState<FormImageInputDataType[]>([]);

  const handleChangeImage = useCallback((images: FormImageInputDataType[]) => {
    setIsTouched(true);
    setImageData(images);
  }, []);

  const handleClickUpdate = useCallback(async () => {
    setIsTouched(false);
    setIsSubmitting(true);

    await onChange(ACBUILDING_SITE_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE, {
      value: JSON.stringify(imageData.map((item) => item.id)),
      group: CONFIG_GROUP_ENUM.SITE,
      type: CONFIG_TYPE_ENUM.IMAGE_ARRAY,
    });

    setIsSubmitting(false);
  }, [imageData]);

  return (
    <SiteConfigBlockContainer
      title={t("introduceImage")}
      subtitle={t("introduceImageDescription")}
      isLoading={isSubmitting}
      websites={[WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV, WEBSITE_DOMAIN_ENUM.ACBUILDING]}
    >
      <ImageInput
        name="homeIntroduce"
        className="grid-cols-3 xl:grid-cols-5"
        isMultiple
        value={generateImagesFormData((data?.value as unknown as ICloudflareImageResponse[]) ?? [])}
        onChange={handleChangeImage}
      />
      <Button
        className="ring-0"
        disabled={!isTouched || isSubmitting}
        isLoading={isSubmitting}
        onClick={handleClickUpdate}
      >
        {t("update")}
      </Button>
    </SiteConfigBlockContainer>
  );
};

export default SiteConfigHomeIntroduceImage;
